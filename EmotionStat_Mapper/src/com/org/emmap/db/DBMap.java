package com.org.emmap.db;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSet;
import com.mysql.jdbc.ResultSetMetaData;
import com.mysql.jdbc.Statement;
import com.org.emmap.node.FNode;

public class DBMap {
	private static Connection connection;
	private static Statement statement;
	private static ResultSet resultSet;
	
	private static String database_url = "localhost";
	public static String database_name = "emotionstat";
	private static String database_usr = "root";
	@SuppressWarnings("unused")
	private static String database_pass = "";
	public static String table_name = "nodes";
	
	public static enum Mode{ SELECT , UPDATE };
	
	private static void connect() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = (Connection) DriverManager.getConnection("jdbc:mysql://"+database_url+"/"+database_name+"?user="+database_usr);
	}
	
	private static void disconnect() throws SQLException{
		if(resultSet!=null) resultSet.close();
		if(statement!=null) statement.close();
		if(connection!=null) connection.close();
	}
	
	@SuppressWarnings("serial")
	public static ArrayList<HashMap<String, Object>> query(String sql, Mode mode) throws Exception{
		ArrayList<HashMap<String, Object>> nodes_fetched = null;
		
		connect();
		
		statement = (Statement) connection.createStatement();
		
		switch(mode){
			case SELECT:
				nodes_fetched = new ArrayList<HashMap<String, Object>>();
				resultSet = (ResultSet) statement.executeQuery(sql);
				
				ResultSetMetaData meta = (ResultSetMetaData) resultSet.getMetaData();
				
				while(resultSet.next())
					nodes_fetched.add(new HashMap<String, Object>(){{
						for(int i=1;i <= meta.getColumnCount();i++){
							String colName = meta.getColumnName(i);
							put(colName, resultSet.getObject(colName));
						}
					}});
				break;
			case UPDATE:
				statement.executeUpdate(sql);
				break;
			default: break;
		}
		
		disconnect();
		return nodes_fetched;
	}
	
	public static boolean node_outdated(String username){
		ArrayList<HashMap<String, Object>> node = null;
		try {
			node = DBMap.query("SELECT last_updated FROM "+table_name+" WHERE username = '"+username+"'", DBMap.Mode.SELECT);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return node.size() == 1; // && node.get(0).get("last_updated")....; (AND if it's old)
	}
	
	public static boolean node_exists(String username){
		ArrayList<HashMap<String, Object>> node = null;
		try {
			node = DBMap.query("SELECT last_updated FROM "+table_name+" WHERE username = '"+username+"'", DBMap.Mode.SELECT);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return node.size() == 1;
	}
	
	public static void insert_node(FNode node) throws Exception{
		DBMap.query(
				"INSERT INTO "+table_name
				+ " (username, profile, feed, friendlist)"
				+ " VALUES ('"+node.getUsername()+"', '"+node.getProfile().toString().replaceAll("'","\\\\\'")+"', '"+node.getFeed().html().replaceAll("'","\\\\\'")+"', '"+node.getFriendlist().toString()+"')", Mode.UPDATE);
	}
}
