frappe.ui.form.on("Sales Invoice", "onload", function(frm) {
  if (frm.doc.__islocal) {
    frappe.call({
      method: "frappe.client.get_list",
      args: {
        doctype: "Ownership Transfer",
        filters: {
          property_id: frm.doc.property_id
        },
        fields: ["name", "transfer_fee"],
        limit: 1,
        order_by: "creation desc"
      },
      callback: function(r) {
        if (r.message && r.message.length > 0) {
          var transfer_fee = r.message[0].transfer_fee;
          frm.doc.items.forEach(function(item) {
            item.rate = transfer_fee;
            item.item_code = "Transfer Charges";
            item.item_name = "Transfer Charges";
            item.qty = 1;
          });
          frm.refresh_fields();
        }
      }
    });
  }
});


frappe.ui.form.on('Ownership Transfer', {
  property_id: function(frm) {
    if(frm.doc.property_id) {
      frappe.call({
        method: "frappe.client.get_list",
        args: {
          doctype: "Sales Invoice",
          filters: {
            property_id: frm.doc.property_id,
            docstatus: 1
          },
          fields: ["outstanding_amount"],
          limit: 1
        },
        callback: function(r) {
          if(r.message && r.message.length > 0) {
            frm.set_value("all_dues_clear", "No")
            frm.set_value("balance_dues", r.message[0].outstanding_amount);
          }
        }
      });
    }
  }
});

frappe.ui.form.on('Ownership Transfer', {
    percentage:function(frm) {
		var a = frm.doc.selling_price;
		var b = frm.doc.percentage;
		var c = a * b / 100;
		console.log(a)
		frm.set_value('transfer_fee',c);
	}
});