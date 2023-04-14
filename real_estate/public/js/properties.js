frappe.ui.form.on("Properties", {
    before_save: function(frm) {
        if (frm.doc.property_nature == "Commercial") {
            var a = frm.doc.society_abbr;
            var b = frm.doc.district_abbr;
           var c = a + "-COMM-"+ b + "-";
            frm.set_value('naming_series',c);
            console.log(c)
        } else if (frm.doc.property_nature == "Residential") {
            let a = frm.doc.society_abbr;
            let b = frm.doc.district_abbr;
            let c = a + "-RESI-"+ b + "-";
            frm.set_value('naming_series',c);
        }
    }
});