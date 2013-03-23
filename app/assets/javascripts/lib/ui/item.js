var ItemFormatter = Class.create();
ItemFormatter.TMPL = Template.get("inbox_items");
ItemFormatter.extend({
    initialize: function(){
        this.tmpl = new Template(ItemFormatter.TMPL);
        var filters = {
            created_on  : Filter.created_on,
            modified_on : Filter.modified_on,
            author      : Filter.author,
            enclosure   : Filter.enclosure,
            category    : Filter.category
        };
        this.tmpl.add_filters(filters);
    },
    compile: function(){
        return this.tmpl.compile();
    },
    reset_count: function(){
        this.item_count = 0;
    }
});

