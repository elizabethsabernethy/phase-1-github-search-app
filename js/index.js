document.addEventListener('DOMContentLoaded', ()=>{
    const usersContainer = document.getElementById('github-container');
getUsers();
})

function getUsers(){
    const form = document.getElementById('github-form');
    const input = document.getElementById('search'); 
    const userList = document.getElementById('user-list');
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        fetch(`https://api.github.com/search/users?q=${input.value}`, {
            method: 'GET',
            headers: {
                'Accept': `application/vnd.github.v3+json`
            }
        })
        .then(response => response.json())
        .then(data => {
            let users = Object.values(data)[2];
            users.forEach(user => {
                const userInfo = document.createElement('li');
                const userLogin = document.createElement('h2');
                const userURL = document.createElement('h3');
                userLogin.textContent = `Login: ${user.login}`;
                userURL.innerHTML = `URL: ${user.url}`;
                const userAvatarURL = user.avatar_url;
                const userAvatar = document.createElement('img');
                userAvatar.src = userAvatarURL;

                userInfo.appendChild(userLogin);
                userInfo.appendChild(userURL);
                userInfo.appendChild(userAvatar);
                
                userList.appendChild(userInfo);

                userInfo.addEventListener('click', ()=>{
                    fetch(`https://api.github.com/users/${user.login}/repos`, {
                        method: 'GET',
                        headers: {
                            'Accept': `application/vnd.github.v3+json`
                        }
                    })
                    .then(response => response.json())
                    .then(repos => {
                        repos.forEach(repo => {
                            const repoURL = document.createElement('h5');
                            repoURL.innerHTML = `Repo URL: ${repo.url}`;
                            const repoName = document.createElement('h4');
                            repoName.textContent = `Repo Name: ${repo.name}`;

                            userInfo.appendChild(repoName);
                            userInfo.appendChild(repoURL);
            
                        }
                            )
                    })
                })
            })
        })
        
    })
}