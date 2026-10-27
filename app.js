let memberships = [
  {
    memberCode: "GYM-001",
    customerName: "Hoàng Tuấn Anh",
    packageName: "Gói Kim Cương VIP",
    durationMonths: 12,
    pricePerMonth: 600000,
    totalAmount: 6480000,
  },
  {
    memberCode: "GYM-002",
    customerName: "Vũ Mai Phương",
    packageName: "Gói Tiêu Chuẩn",
    durationMonths: 3,
    pricePerMonth: 450000,
    totalAmount: 1417500,
  },
  {
    memberCode: "GYM-003",
    customerName: "Đỗ Quốc Bảo",
    packageName: "Gói Nâng Cao",
    durationMonths: 6,
    pricePerMonth: 500000,
    totalAmount: 2835000,
  },
];

// FR-01: hiển thị danh sách gói đăng ký
const displayMemberships = (list) => {
  if (list.length === 0) {
    alert("Danh sách đăng ký hiện đang trống");
    return;
  }

  let totalRevenue = 0;
  for (let index = 0; index < list.length; index++) {
    totalRevenue += list[index].totalAmount;
    console.log(
      `${index + 1}. ${list[index].memberCode} - ${list[index].customerName} - ${list[index].packageName}
Thời hạn: ${list[index].durationMonths} tháng | Giá/tháng: ${list[index].pricePerMonth} | Tổng TT: ${list[index].totalAmount}`,
    );
  }
  console.log(`Tổng: ${list.length} gói đăng ký – Doanh thu: ${totalRevenue}`);
  alert("Hiển thi danh sách thanh công!");
};

const findMemberIndex = (code) => {
  return memberships.findIndex((value) => value.memberCode === code);
};

const validateMemberCode = (code) => {
  let cleanCode = code.trim().toUpperCase();
  if (cleanCode === "" || cleanCode.length === 0) {
    return "Lỗi: Chưa nhập mã hội viên";
  }

  if (cleanCode.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }

  if (!cleanCode.startsWith("GYM-")) {
    return "Lỗi: Sai tiền tố GYM-";
  }

  if (cleanCode.indexOf(" ") !== -1) {
    return "Lỗi: Chứa khoảng trắng";
  }

  if (findMemberIndex(cleanCode) !== -1) {
    return "Lỗi: Mã hội viên đã tồn tại";
  }
  return "";
};

const formatCustomerNameAndPackageName = (name) => {
  if (!name) {
    return "";
  }

  let trimed = name.trim();

  let words = trimed.split(" ").filter((word) => word !== "");

  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizeWords.join(" ");
};

const inputPositiveInteger = (message) => {
  while (true) {
    let input = prompt(message);

    if (input == null) {
      return null;
    }

    let trimed = input.trim();

    if (trimed === "") {
      alert("Vui lòng không để trống");
      continue;
    }

    let number = +trimed;

    if (Number.isInteger(number) && number > 0) {
      return number;
    }
    alert("Vui lòng nhập số nguyên lớn hơn 0");
    continue;
  }
};

const calculateMembershipFee = (durationMonths, pricePerMonth) => {
  let baseCost = durationMonths * pricePerMonth;
  let discount = durationMonths >= 6 ? Math.round(baseCost * 0.1) : 0;
  let VATFee = Math.round((baseCost - discount) * 0.05);
  let totalAmount = baseCost - discount + VATFee;

  return { baseCost, discount, VATFee, totalAmount };
};

// FR-02: Đăng ký gói tập mới
const handleAddNewMenbership = () => {
  let rawCode = prompt("Nhập mã hội viên: ");
  if (rawCode === null) {
    alert("Đã hủy thao tác!");
    return;
  }

  let validateError = validateMemberCode(rawCode);
  if (validateError !== "") {
    alert(validateError);
    return;
  }

  let memberCode = rawCode.trim().toUpperCase();

  let rawCustomerName = "";
  while (true) {
    rawCustomerName = prompt("Nhập tên khách hàng: ");
    if (rawCustomerName === null) {
      alert("Đã hủy thao tác!");
      return;
    }
    if (rawCustomerName.trim() !== "") {
      break;
    }
    alert("Không được bỏ trống!");
  }

  let customerName = formatCustomerNameAndPackageName(rawCustomerName);

  let rawPackageName = "";
  while (true) {
    rawPackageName = prompt("Nhập tên gói: ");
    if (rawPackageName === null) {
      alert("Đã hủy thao tác!");
      return;
    }
    if (rawPackageName.trim() !== "") {
      break;
    }
    alert("Không được bỏ trống!");
  }

  let packageName = formatCustomerNameAndPackageName(rawPackageName);

  let durationMonths = inputPositiveInteger("Nhập số tháng đăng ký: ");
  if (durationMonths === null) {
    alert("Đã hủy thao tác");
    return;
  }

  let pricePerMonth = inputPositiveInteger("Nhập giá cước mỗi tháng: ");
  if (pricePerMonth === null) {
    alert("Đã hủy thao tác");
    return;
  }

  let calc = calculateMembershipFee(durationMonths, pricePerMonth);

  let newMembership = {
    memberCode,
    customerName,
    packageName,
    durationMonths,
    pricePerMonth,
    totalAmount: calc.totalAmount,
  };

  memberships.push(newMembership);

  console.log("--- ĐĂNG KÝ THÀNH CÔNG ---");
  console.log(`Mã hội viên: ${memberCode} | Khách hàng: ${customerName}`);
  console.log(
    `Gói: ${packageName} | Thời hạn: ${durationMonths} tháng | Đơn giá: ${pricePerMonth}`,
  );
  console.log(
    `Chi phí cơ sở: ${calc.baseCost} | Giảm giá: ${calc.discount} | VAT: ${calc.VATFee}`,
  );
  console.log(`Tổng thanh toán: ${calc.totalAmount}`);
};

// FR-03: Cập nhật thời hạn và giá
const handleUpdateMenbership = () => {
  if (memberships.length === 0) {
    alert("Danh sách đăng ký hiện đang trống");
    return;
  }

  let searchCode = prompt("Nhập mã hội viên cần cập nhật: ");
  if (searchCode === null) {
    alert("Đã hủy thao tác");
    return;
  }
  let cleanCode = searchCode.trim().toUpperCase();
  let indexFound = findMemberIndex(cleanCode);

  if (indexFound === -1) {
    alert(`Không tìm thấy gói đăng ký có mã ${cleanCode}`);
    return;
  }

  let current = memberships[indexFound];
  const oldTotal = current.totalAmount;

  let newDurationMonths = inputPositiveInteger("Nhập số tháng đăng ký mới: ");
  if (newDurationMonths === null) {
    alert("Đã hủy thao tác");
    return;
  }

  let newPricePerMonth = inputPositiveInteger("Nhập giá cước mỗi tháng mới: ");
  if (newPricePerMonth === null) {
    alert("Đã hủy thao tác");
    return;
  }

  let newCalc = calculateMembershipFee(newDurationMonths, newPricePerMonth);

  memberships[indexFound].durationMonths = newDurationMonths;
  memberships[indexFound].pricePerMonth = newPricePerMonth;
  memberships[indexFound].totalAmount = newCalc.totalAmount;

  console.log(`Tổng thanh toán cũ: ${oldTotal}`);
  console.log(`Tổng thanh toán mới: ${memberships[indexFound].totalAmount}`);
};

// FR-04: Xóa gói đăng ký
const handleDeleteMenbership = () => {
  if (memberships.length === 0) {
    alert("Danh sách đăng ký hiện đang trống");
    return;
  }

  let searchCode = prompt("Nhập mã hội viên cần xóa: ");
  if (searchCode === null) {
    alert("Đã hủy thao tác xóa");
    return;
  }
  let cleanCode = searchCode.trim().toUpperCase();
  let indexFound = findMemberIndex(cleanCode);

  if (indexFound === -1) {
    alert(`Không tìm thấy gói đăng ký có mã ${cleanCode}`);
    return;
  }

  let accept = prompt("Bạn có chắc chắn muốn hủy gói này không? (Y/N)");
  if (accept !== null && accept.trim().toUpperCase() === "Y") {
    memberships.splice(indexFound, 1);
    console.log(`Xóa thành công, còn lại ${memberships.length} gói đăng ký.`);
  } else {
    console.log("Đã hủy thao tác xóa");
  }
};

// FR-05: tìm kiếm
const handleSearchMenbership = () => {
  if (memberships.length === 0) {
    alert("Danh sách đăng ký hiện đang trống");
    return;
  }

  let searchPackage = prompt("Nhập tên gói cần tìm kiếm: ");
  if (searchPackage === null || searchPackage.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let cleanKeyword = searchPackage.trim().toLowerCase();
  let filtered = memberships.filter((item) => {
    return item.packageName.toLowerCase().includes(cleanKeyword);
  });

  if (filtered.length === 0) {
    alert("Không tìm thấy gói đăng ký phù hợp");
    return;
  }

  displayMemberships(filtered);
};

const main = () => {
  let menu = `
=====================================================
      HỆ THỐNG QUẢN LÝ HỘI VIÊN FITLIFE CENTER
=====================================================
1. Hiển thị danh sách gói đăng ký
2. Đăng ký gói tập mới
3. Cập nhật thời hạn và giá gói
4. Hủy / Xóa gói đăng ký
5. Tìm kiếm gói tập theo tên gói
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
`;
  let choice = "";
  do {
    choice = prompt(menu);
    if (choice === null) {
      alert("Cảm ơn bạn đã sử dụng chương trình!");
      return;
    }

    switch (choice) {
      case "1":
        displayMemberships(memberships);
        break;

      case "2":
        handleAddNewMenbership();
        break;

      case "3":
        handleUpdateMenbership();
        break;

      case "4":
        handleDeleteMenbership();
        break;

      case "5":
        handleSearchMenbership();
        break;

      case "0":
        alert("Cảm ơn bạn đã sử dụng chương trình!");
        break;

      default:
        alert("Lựa chọn không hợp lệ!");
        break;
    }
  } while (choice !== "0");
};

main();
