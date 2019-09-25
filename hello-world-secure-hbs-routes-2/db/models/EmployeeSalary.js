var mongoose = require('mongoose');

var EmployeeSalary = mongoose.model('EmployeeSalary',{

  unit: { type: String, Required:  'Unit cannot be left blank.' },

  agencyName:    { type: String,     Required:  'Agency Name cannot be left blank.'},

  id: { type: String ,    Required:  'ID cannot be left blank'},

  lastName: { type: String ,  Required:  'Last Name cannot be left blank'},

  firstName: { type: String , Required:  'First Name cannot be left blank'},

  middleName: { type: String },

  jobCode: { type: String },

  jobTitle: { type: String },

  deptId: { type: String },

  deptName: { type: String },

  compRate: { type: Number },

  compRatePeriod: { type: String },

  fullPart: { type: String },

  effDate: { type: String }

});

module.exports = {EmployeeSalary}