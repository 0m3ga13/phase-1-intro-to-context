// Your code here

function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((employeeData) => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  return (
    (employeeRecord.timeOutEvents.find((ele) => ele.date == date).hour -
      employeeRecord.timeInEvents.find((ele) => ele.date == date).hour) /
    100
  );
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map((ele) => ele.date);
  return dates.reduce(
    (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
    0
  );
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
