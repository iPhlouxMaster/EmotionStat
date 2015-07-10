package com.org.emmap.node;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

import org.jsoup.select.Elements;

import com.org.emmap.db.DBMap;
import com.org.scrapbook.client.FacebookClient;
import com.org.scrapbook.object.User;

public class FNode {
	private String username;
	private User profile;
	private Elements feed;
	private ArrayList<String> friendlist;
	private Timestamp last_updated;
		
	public String getUsername() {
		return username;
	}

	public User getProfile() {
		return profile;
	}

	public Elements getFeed() {
		return feed;
	}

	public ArrayList<String> getFriendlist() {
		return friendlist;
	}

	public Timestamp getLast_updated() {
		return last_updated;
	}

	public FNode(String username, User profile, Elements feed, ArrayList<String> friendlist) throws Exception{
		// After setting all fields, send this node to the DB
		this.username = username;
		this.profile = profile;
		this.feed = feed;
		this.friendlist = friendlist;
		this.last_updated = new Timestamp(new Date().getTime());
		
		// Send to DB if and only if he doesn't exist already!
		if(!DBMap.node_exists(username))
			DBMap.insert_node(this);
		else
			if(DBMap.node_outdated(username)){
				// Update user
				
			}
	}
	
	@SuppressWarnings("unchecked")
	public static FNode discover(String node_username_id, FacebookClient faceClient) throws Exception{
		User profile = null;
		Elements feed = null;
		ArrayList<User> friends = null;
		ArrayList<String> friendslist = null;
		
		// Check if user exists on the database (don't implement this for now! Use the cache instead!):
		/*if(DBMap.node_exists(node_username_id) && !DBMap.node_outdated(node_username_id)){
			// Load data from database!
			ArrayList<HashMap<String, Object>> data_from_db = DBMap.query("SELECT * FROM "+DBMap.table_name+" where username='"+node_username_id+"'", DBMap.Mode.SELECT);
			// Parse user:
			profile = User.parse(data_from_db);
			
		}else{*/
		
		profile = faceClient.get(node_username_id, User.class);
		feed = faceClient.get(node_username_id+"/feed", Elements.class);
			
		friends = faceClient.get(node_username_id+"/friends", ArrayList.class);
		friendslist = new ArrayList<String>();
		for(User friend: friends)
			friendslist.add(friend.getId());
		//}
		
		return new FNode(profile.getUsername(), profile, feed, friendslist);
	}
	
	public String getNextNode(int index){
		return friendlist.get(index);
	}
	
	public FNode getNextNode(int index, FacebookClient faceClient) throws Exception{
		return discover(getNextNode(index), faceClient);
	}
	
	public int neighborCount(){
		return friendlist.size();
	}
}
