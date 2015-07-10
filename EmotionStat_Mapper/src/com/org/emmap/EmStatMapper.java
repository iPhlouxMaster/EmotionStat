package com.org.emmap;

import java.util.ArrayList;

import com.org.emmap.node.FNode;
import com.org.scrapbook.cache.JCache;
import com.org.scrapbook.client.FacebookClient;

public class EmStatMapper {

	FNode me;
	ArrayList<FNode> myFriends;
	FacebookClient fb;
	
	private void initializeMainCircle() throws Exception {
		me = FNode.discover("me", fb);
		myFriends = new ArrayList<FNode>();
		
		// Discover all my friends, update them and insert them into the DB:
		for(int i=0;i<me.neighborCount();i++){
			myFriends.add(me.getNextNode(i, fb));
			System.out.println(" >> Node "+i+":\n" + myFriends.get(i).getProfile());
		}
	}
	
	public EmStatMapper(){
		fb = new FacebookClient();
		
		try {
			initializeMainCircle();
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
