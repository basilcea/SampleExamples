import React  from 'react';

const Home  = () =>  {

    return (
        <div className="App">
          <header className="App-header">
            <p>Sign up with slack</p>
            <a
              href={`https://slack.com/oauth/authorize?scope=identity.basic identity.email identity.team identity.avatar&client_id=${process.env.REACT_APP_client_id}&redirect_uri=${process.env.REACT_APP_redirect_uri}`}
            >
              <img
                alt="Sign in with Slack"
                height="40"
                width="172"
                src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
              />{" "}
            </a>
          </header>
        </div>
      );
}
export default Home