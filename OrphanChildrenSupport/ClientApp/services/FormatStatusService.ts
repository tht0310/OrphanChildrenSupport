export const getStatus = (id: number) => {
  let name = "";
  switch (id) {
    case 0:
      name = "Waiting For Approval";
      break;
    case 1:
      name = "Processing";
      break;
    case 2:
      name = "Finish";
      break;
    case 3:
      name = "Cancelled";
      break;
    case 4:
      name = "Rejected";
      break;
  }
  return name;
};

export const getTagColor = (status: number) => {
  let result = "";
  if (status === 0 || status === 1) {
    result = "cyan";
  }
  if (status === 2) {
    result = "green";
  }
  if (status === 3 || status === 4) {
    result = "red";
  }

  return result;
};

export const renderClassName = (status: number) => {
  let result = "";
  if (status === 3 || status === 4) {
    result = "red-row";
  }

  return result;
};
