import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export const userManager = new UserManager({
    authority: process.env.REACT_APP_AUTHORITY!, 
    metadataUrl: process.env.REACT_APP_METADATA!,
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID!,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI!,
    post_logout_redirect_uri: process.env.REACT_APP_REDIRECT_POST_LOGOUT_REDIRECT_URI!,
    response_type: 'code',
    scope: 'openid profile email',
    loadUserInfo: false,
    monitorSession: true,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
});
export default userManager;
