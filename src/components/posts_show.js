 import React, {Component,PropTypes} from 'react';
 import {connect} from 'react-redux';
 import { fetchPost, deletePost } from '../actions/index';
 import {Link} from 'react-router';
 
 class PostsShow extends Component{

     componentWillMount(){
         this.props.fetchPost(this.props.params.id)
     }

     static contextTypes={
        router : PropTypes.object
    };

     onDeleteClick(){
             this.props.deletePost(this.props.params.id).then(()=>{
                // blog post has been created and navigate the user to index
                // we navigate by calling this.context.router.push with the new path to navigate to 
                this.context.router.push('/');
            });
         }


     render(){

         const {post}=this.props;
         // This is equal to const post = this.props.post;

         
         if(!post){
             return <div>Loading...</div>
         }

         return (
             <div>
                <Link to="/" className="btn btn-default">Home</Link>
                <button onClick={this.onDeleteClick.bind(this)}  className="btn btn-danger pull-xs-right" > Delete</button>
                <h3>{post.title}</h3>
                <h6>Categories : {post.categories}</h6>
                <p>{post.content}</p>

             </div>
             );
     }
 }

function mapStateToProps(state){
    return {post: state.posts.post};
}

 export default connect(mapStateToProps,{fetchPost,deletePost}) (PostsShow);