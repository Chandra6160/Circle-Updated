from flask import Flask
from flask import request
import json
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/circle"
mongo = PyMongo(app)
CORS(app)


@app.route('/users',methods=['GET'])
def get_users():
    return dumps(mongo.db.users.find({}))

@app.route('/blogs',methods=['GET'])
def get_blogs():
    return dumps(mongo.db.blogs.find({}))


@app.route('/createusers',methods=['POST'])
def create_users():
    Add={}
    doc_count=mongo.db.users.count_documents({})
    count=0
    if doc_count > 0:
        count=doc_count
    else:
        count=0
    for x in range(0,100):
        count=count+1
        Add["_id"]=ObjectId()
        Add["name"]=request.json["name"]+str(count)
        Add["phone"]=request.json["phone"]+str(count)
        mongo.db.users.insert(Add)
    return dumps("users created")

@app.route('/createblogs',methods=['POST'])
def create_blogs():
    blogs={}
    doc_count=mongo.db.blogs.count_documents({})
    count=0
    if doc_count > 0:
        count=doc_count
    else:
        count=0
    for x in range(0,20):
        count=count+1
        blogs["_id"]=ObjectId()
        blogs["heading"]=request.json["heading"]+str(count)
        blogs["text"]=request.json["text"]+str(count)
        mongo.db.blogs.insert(blogs)
    return dumps("blogs created")

@app.route('/commentblogs/<ObjectId:userid>/blog/<ObjectId:blogid>',methods=['POST'])
def comment(userid,blogid):
    comment={}
    # comment["_id"]=userid
    comment["comment"]=request.json["comment"]
    mongo.db.users.update({"_id":userid},{"$push":{"blog_id":blogid,"comment":comment}})
    return ("user commented")

@app.route('/user/<ObjectId:userid>/level/<int:levelNo>',methods=['GET'])
def level_freinds(userid,levelNo):
    user=mongo.db.users.find_one({"_id":userid})
    cmtd=mongo.db.users.find({"blog_id":{"$in":user["blog_id"]}})
    il=[]
    if levelNo==1:
        return dumps(cmtd)
    elif levelNo>1:
        a=[]
        o=[]
        
        for i in range(1,levelNo):
            # print(levelNo)
            if i==1:
                for x in cmtd:
                    b=mongo.db.users.find({"blog_id":{"$in":x["blog_id"]}})
                    # print(b)
                    for j in b:

                        c=mongo.db.users.find({"blog_id":{"$in":user["blog_id"]}})
                        ids=[]
                        for m in c:
                            if m["_id"] not in il:
                                il.append(m["_id"])
                            # ids.append(m["_id"])
                            
                        if j["_id"] not in il:
                            a.append(j)
                            il.append(j["_id"])
                o=a
                # print(a)
                
            elif i>1:
                print(i)
                # print(a)
                
                o=[]
                print(a)
                print("2")
                for x in a:
                    
                    b=mongo.db.users.find({"blog_id":{"$in":x["blog_id"]}})
                    # print(dumps(b))
                    # print(2)
                    for j in b:
                        
                        c=a
                        
                        # for m in c:
                        #     if m["_id"] not in il:
                        #         il.append(m["_id"])
                        if j["_id"] not in il:
                            il.append(j["_id"])
                            o.append(j)
                            
                        # if j["_id"] not in il:
                        #     o.append(j)
                        #     flag=False
                        #     for h in o:
                        #         if h["_id"]==j["_id"]:
                        #             flag=True
                            # if flag==False:
                                
                a=o
            print("    ")
            # print(il)     
            print("    ")
            print("    ")
                
        return dumps(o)
    
@app.route('/blogs/common/<ObjectId:blogid>',methods=['GET'])
def blogs_first_level_freinds(blogid):
    return dumps(mongo.db.users.find({"blog_id":{"$all":[blogid]}}))

@app.route('/user/level/<ObjectId:blogid>',methods=['GET'])
def users_level_freinds(blogid):
    return dumps(mongo.db.users.find({"blog_id":{"$all":[blogid]}}).skip(1))
    



