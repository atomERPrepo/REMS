frappe.ui.form.on('Requests', {
    refresh: function(frm) {
        {        
        // Set today's date for the date field
        frm.set_value('date', frappe.datetime.get_today());
        }
        }
});