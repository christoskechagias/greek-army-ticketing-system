const { Roles } = require("../models/roles.js");

const dummyRoles = () => {
  const roles = [
    {
      title: "Διαχειριστής",
      key: "admin",
    },
    {
      title: "Χρήστης",
      key: "user",
    },
    {
      title: "Μέλος του ΓΕΠ",
      key: "member",
    },
  ];

  Roles.insertMany(roles)
    .then((docs) => {
      console.log("Test users created successfully:", docs);
    })
    .catch((err) => {
      console.error("Error creating test users:", err);
    });
};

module.exports = { dummyRoles };
