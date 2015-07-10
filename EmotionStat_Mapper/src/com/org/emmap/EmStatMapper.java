package com.org.emmap;

import java.util.ArrayList;

import com.org.emmap.node.FNode;
import com.org.scrapbook.cache.JCache;
import com.org.scrapbook.client.FacebookClient;

public class EmStatMapper {

	FNode me;
	ArrayList<FNode> myFriends;
	FacebookClient fb;
	
	ArrayList<FNode> circleBot;
	private boolean crawling;
	
	private void initializeMainCircle() throws Exception {
		me = FNode.discover("me", fb);
		myFriends = new ArrayList<FNode>();
		
		// Discover all my friends, update them and insert them into the DB:
		for(int i=0;i<me.neighborCount();i++){
			myFriends.add(me.getNextNode(i, fb));
			System.out.println(" >> Main Node "+i+":\n" + myFriends.get(i).getProfile());
		}
			
	}
	
	public void crawl() throws Exception{
		ArrayList<String> crawledList = new ArrayList<String>();
		
		circleBot = new ArrayList<FNode>(myFriends);
		
		// Begin crawl:
		int ctr = 0;
		int level = 0;
		while(crawling){
			ArrayList<FNode> newCircle = new ArrayList<FNode>();
			
			for(int i=0;i<circleBot.size();i++){
				FNode current_node = circleBot.get(i);
				
				for(int j=0;j<current_node.neighborCount();j++){
					if(!crawling) break;
					FNode next_node = current_node.getNextNode(j, fb);
					String this_username = next_node.getUsername();
					if(!crawledList.contains(this_username)){
						try{
							newCircle.add(next_node);
							
							crawledList.add(this_username);
							
							System.out.println(">> Current: "+current_node.getUsername()+" | Level: "+level+" | Depth: "+i+" | Node "+j+":\n" +next_node.getProfile());
							
							ctr++;
						}catch(Exception e){}
					}
				}
				if(ctr>500 || !crawling){ crawling = false; break;}
			}
			
			circleBot = new ArrayList<FNode>(newCircle);
			level++;
		}
	}
	
	public EmStatMapper(){
		Runtime.getRuntime().addShutdownHook(new Thread() {
		    public void run() {
		    	crawling = false;
		    }
		 });
		
		fb = new FacebookClient();
		crawling = true;
		try {
			initializeMainCircle();
			crawl(); // Start it
		} catch (Exception e) {
			JCache.cacheman.shutdown();
			e.printStackTrace();
		}finally{
			fb.end();
		}
		
		// Start the bot up, fetching as soon as possible the closest friends
		
		// then schedule regular scrapes for the next layer of friends, each next longer than the previous
		
		// everytime a node is allocated, it should be stored into the database
		
		
	}
}
