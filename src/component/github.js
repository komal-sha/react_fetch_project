import  './github.css'
import React,{useState,useEffect} from 'react';
import {Form,Card,Image,Icon} from 'semantic-ui-react';
//import logo from './logo.svg';

function Github()
{
    const [name, setName] = useState('');
    const [userName, setUsername] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [repos, setRepos] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.github.com/users/example`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }, []);

    const setData =({name, login, following, followers, public_repos, avatar_url}) => {
        setName(name);
        setUsername(userName);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
    }

    const HandleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const HandleSubmit = () => {
        console.log(userInput);
        fetch(`https://api.github.com/users/${userInput}`)
        .then(res => res.json())
        .then(data => {
            if(data.message){
                setError(data.message);
            }
            else{
                setData(data);
                setError(null);
            }
        });
    }

    return (
       <div>
            <div className='navbar'>
                <h1> Github search window</h1> 
            </div>

            <div className='search'>
                <Form onSubmit={HandleSubmit}>
                <Form.Group>
                    <Form.Input
                        placeholder='Github User'
                        name='github user'
                        onChange={HandleSearch}
                    />
                    <Form.Button content='Search' />
                </Form.Group>
                </Form>
            </div>

            {error ? (<h1>{error}</h1>) : (
                <div className="card">
                <Card>
                    <Image src={avatar}
                        wrapped 
                        ui={false} />
                    <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Header>{userName}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {followers} Followers
                    </a>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {repos} Repos
                    </a>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {following} Following
                    </a>
                    </Card.Content>
                </Card>
            </div>
            )}

            
        </div>
    );
}
export default Github;
