'use strict';
const Moment = require('moment');
const React = require('react');
const ReactRouter = require('react-router');
const Actions = require('./actions');
const Store = require('./store');
const Sidebar = require('../sidebar.jsx');
const ContentForm = require('./content-form.jsx');
const DeleteForm = require('../../../../client/components/admin/delete-form.jsx');
const ObjectAssign = require('object-assign');

const Link = ReactRouter.Link;

class EditSite extends React.Component {
    constructor(props) {
        super(props);

        Actions.getSite(props.params.id);
        Actions.getUser();
        this.state = Store.getState();
        this.state.formData = {};
        this.state.content.redirect = false;
        this.state.content.proc = "edit";
        this.state.collectionSchema.schema = {};
        this.state.collectionSchema.requested = false;
        this.state.content.formData = {type:''};

    }
    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        // Don't show success alert if leaving page.
        this.state.site.showSaveSuccess = false;
        this.unsubscribeStore();
    }

    onChange(formData) {

        this.setState({
            formData: formData
        });
    }

    onStoreChange() {
        let newState = Store.getState();

        if (newState.site.hydrated && !newState.collectionSchema.hydrated && !newState.collectionSchema.loading) {
            Actions.getCollectionSchema(newState.site.schema, this.props.params.collection);
        }
        if (newState.collectionSchema.hydrated && !newState.content.hydrated && !newState.content.loading) {
            Actions.getContent(this.props.params.id, this.props.params.collection, this.props.params.contentId);
        }
        if (newState.content.hydrated && !newState.content.loading && Object.keys(this.state.formData).length === 0) {
            this.state.formData = newState.content.formData;
        }

        newState.formData = ObjectAssign({}, this.state.formData, newState.formData);
        this.setState(newState);

    }

    render() {

        return (
            <section className="container site-admin">
                <div className="col-sm-2 left">
                    <Sidebar name={this.state.site.name} id={this.props.params.id} location={this.props.location} />
                </div>
                <div className="col-sm-10 center">
                    <h1>Edit {this.state.content.formData.type}</h1>
                    <ContentForm user={this.state.user}
                        onChange={this.onChange.bind(this)}
                        site={this.state.site}
                        formData={this.state.formData}
                        content={this.state.content}
                        schema={this.state.collectionSchema}
                        uiSchema={this.state.collectionSchema.uiSchema}
                        />
                    <DeleteForm
                        {...this.state.delete}
                        action={Actions.deleteContent.bind(Actions, this.props.params.id, this.props.params.collection, this.props.params.contentId)}
                    />
                </div>
            </section>
        );
    }
}


module.exports = EditSite;
