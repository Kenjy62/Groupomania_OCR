import React from 'react';

// Components
import Form from './Form/form';
import Post from './Post/posts';

function Main(props) {
    return (
        <main>
            <Form data={props.data}/>
            <Post data={props.data}/>
        </main>
     );
}

export default Main;

// Add Footer after Post