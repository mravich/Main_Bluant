Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model


var Line = Backbone.Model.extend({

	defaults:{
		author: '',
		content: ''
	}


});

// Backbone Collection

var Lines = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/lines'
});


// instantiate two Blogs


// instantiate a Collection


var lines = new Lines();
// Backbone View for one blog
// Backbone View for one line

var LineView = Backbone.View.extend({

		model : new Line(),
		tagName: 'tr',
		initialize: function(){
			this.template = _.template($('.lines-list-template').html());
		},
		events: {
			'click .edit-line' : 'edit',
			'click .update-line': 'update',
			'click .cancel' : 'cancel',
			'click .delete-line' : 'delete'
		},
		edit : function(){
			$('.edit-line').hide();
			$('.delete-line').hide();
			this.$('.update-line').show();
			this.$('.cancel').show();

			var author = this.$('.author').html();
			var content = this.$('.content').html();

			this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
			this.$('.content').html('<input type="text" class="form-control content-update" value="' + content + '">');
		},
		update: function() {
			this.model.set('author', $('.author-update').val());
			this.model.set('content', $('.content-update').val());


			this.model.save(null, {
				success: function(response) {
					console.log('Successfully UPDATED line with _id: ' + response.toJSON()._id);
				},
				error: function(err) {
					console.log('Failed to update line!');
				}
			});
		},
		cancel: function() {
			linesView.render();
		},
		delete: function() {
			this.model.destroy({
				success: function(response) {
					console.log('Successfully DELETED line with _id: ' + response.toJSON()._id);
				},
				error: function(err) {
					console.log('Failed to delete line!');
				}
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

});
// Backbone View for all lines
var LinesView = Backbone.View.extend({
	model: lines,
	el: $('.lines-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT line with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get line!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(line) {
			self.$el.append((new LineView({model: line})).render().$el);
		});
		return this;
	}
});



var linesView = new LinesView();

$(document).ready(function() {
	$('.add-line').on('click', function() {
		var line = new Line({
			author: $('.author-input').val(),
			content: $('.content-input').val(),

		});
		$('.author-input').val('');
		$('.content-input').val('');

		lines.add(line);
		line.save(null, {
			success: function(response) {
				console.log('Successfully SAVED line with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save line!');
			}
		});
	});
})
