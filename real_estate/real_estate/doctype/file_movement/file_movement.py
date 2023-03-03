# Copyright (c) 2023, Atom Global and contributors
# For license information, please see license.txt
from __future__ import unicode_literals

import frappe
from frappe.model.document import Document

class FileMovement(Document):
	pass
	def before_submit(self):
		if self.entry_type == 'Issue':
			self.validate_issue()
			# set the file_name status to be Issued
			file_name = frappe.get_doc('Physical File', self.file_name)
			file_name.status = 'Issued'
			file_name.save()

		elif self.entry_type == 'Return':
			self.validate_return()
			# set the file_name status to be Available
			file_name = frappe.get_doc('Physical File', self.file_name)
			file_name.status = 'Available'
			file_name.save()

	def validate_issue(self):
		# self.validate_membership()
		file_name = frappe.get_doc('Physical File', self.file_name)
				# file_name cannot be issued if it is already issued
		if file_name.status == 'Issued':
					frappe.throw('File is already issued to another Employee')
	def validate_return(self):
		file_name = frappe.get_doc('Physical File', self.file_name)
		# file_name cannot be returned if it is not issued first
		if file_name.status == 'Available':
			frappe.throw('File cannot be returned without being issued first')
