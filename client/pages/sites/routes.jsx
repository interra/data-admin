'use strict';
const App = require('./app.jsx');
const Home = require('./home.jsx');
const NotFound = require('./not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router');
const CreateSite = require('./create-site.jsx');
const ViewSite = require('./view-site.jsx');
const EditSite = require('./edit-site.jsx');
const CreateContent = require('./content/create-content.jsx');
const EditContent = require('./content/edit-content.jsx');
const ViewContent = require('./content/view-content.jsx');
const ContentSearchPage = require('./content/search/index.jsx');


const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;


const Routes = (
    <Router history={browserHistory}>
        <Route path="/sites" component={App}>
            <IndexRoute component={Home} />
            <Route path="new" component={CreateSite} />
            <Route path=":id" component={ViewSite} />
            <Route path=":id/edit" component={EditSite} />
            <Route path=":id/content" component={ContentSearchPage} />
            <Route path=":id/:collection/new" component={CreateContent} />
            <Route path=":id/:collection/:contentId" component={ViewContent} />
            <Route path=":id/:collection/:contentId/edit" component={EditContent} />
            <Route path="*" component={NotFound} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);


module.exports = Routes;
