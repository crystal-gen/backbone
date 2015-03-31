var Backbone = require('backbone'),
	request = require('request');

exports.Model = Backbone.Model.extend({
	
	urlRoot: '/users',
	
	idAttribute: '_id',
	
	defaults: {
		_id: null,
		username: String,
	},
	
	save: function(attrs, opts) {
		request.post(
			this.urlRoot,
			{
				form: attrs
			},
			function(err, resp, body) {
				if (opts.complete) {
					opts.complete(this, resp, body);
				}
				
				if (err || resp.statusCode < 200 || resp.statusCode >= 300) {
					if (opts.error) {
						opts.error(attrs, err, resp, body);
					}
				} else {
					if (opts.success) {
						opts.success(attrs, resp, body);
					}
				}
			}
		);
	}
	
});

exports.Collection = Backbone.Collection.extend({
	
	model: exports.Model,
	
	url: '/users'
	
});