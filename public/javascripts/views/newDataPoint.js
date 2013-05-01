var NewDataPointView = Backbone.View.extend({
	
	events: {
		"click .submitButton" : "submitNewPoint"
	},
	
	initialize: function (){
		
	},

	template: _.template(),
	render: function () {
		this.$el.html(this.template)
	}
});