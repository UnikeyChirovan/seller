var capNhat = true;

const Xuat_Danh_sach = (ds) => {
  let html = ``;
  ds.sort((a, b) => a.Ho_ten.localeCompare(b.Ho_ten));
  ds.forEach((item, index) => {
    html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td class="text-center" style="width: 25%;">
                <img src='${Dia_chi_Img}/${item.Ma_so}.png' class="" />
            </td>
            <td>${item.Ho_ten}</td>
            <td class="text-right" >${item.Ten_Dang_nhap}</td>
            <td class="text-right">${item.Mat_khau}</td>
            <td class="text-center">${item.Nhom_Nguoi_dung.Ma_so}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa Nhân Sự' onclick="updateUser('${item.Ma_so}')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteUser('${item.Ma_so}')" title='Xóa User'>
                    <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `;
  });

  document.querySelector("#Th_Danhsach").innerHTML = html;
};

const KeyCode = (event) => {
  if (event.keyCode == 13) {
    let gtTim = event.target.value.trim();
    let ds = dsUser.filter((x) =>
      x.Ho_ten.toLowerCase().includes(gtTim.toLowerCase())
    );
    Xuat_Danh_sach(ds);
  }
};
// Add Mobile
const insertUser = () => {
  capNhat = true;
  showModal();
};
// Update Mobile
const updateUser = (key) => {
  capNhat = false;
  let item = dsUser.find((x) => x.Ma_so == key);
  showModal(item);
};
// Delete Mobile
const deleteUser = (key) => {
  if (confirm("Hệ thống sẽ Xóa Dữ liệu...?")) {
    let condition = {
      Ma_so: key,
    };
    apiUserDelete(condition).then((result) => {
      alert("Xóa thành công");
      window.location.reload();
    });
  }
};
// Show Modal
const showModal = (item = null) => {
  let urlImg = null;
  let Nhom = "";
  document.querySelector("#ModalTitle").innerHTML = `Thêm Nhân Sự`;
  if (item) {
    document.querySelector("#ModalTitle").innerHTML = `Sửa Thông Tin`;
    urlImg = `${Dia_chi_Img}/${item.Ma_so}.png`;
    Nhom = item.Nhom_Nguoi_dung.Ma_so;
  }

  let html = ``;
  html += `
    <div class="form-group">
        <input type="text" class="form-control" id="Th_Ma_so" style="visibility: hidden;"
            value="${item ? item.Ma_so : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Ten">Tên</label>
        <input type="text" class="form-control" id="Th_Ten" 
            placeholder="Họ và Tên" value="${item ? item.Ho_ten : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Username">Tên Đăng Nhập</label>
        <input type="text" class="form-control" id="Th_Username" 
            placeholder="Tên Đăng Nhập" value="${
              item ? item.Ten_Dang_nhap : ""
            }">
    </div>
    <div class="form-group">
        <label for="Th_Pwd">Mật Khẩu</label>
        <input type="password" class="form-control" id="Th_Pwd" 
            placeholder="Nhập Mật Khẩu" value="${item ? item.Mat_khau : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Nhom_User">Nhóm User</label>
        <select id="Th_Nhom_User">
            <option value="NHAN_VIEN_NHAP_HANG" ${
              Nhom == "NHAN_VIEN_NHAP_HANG" ? "selected" : ""
            } >NHÂN VIÊN NHẬP HÀNG</option>
            <option value="NHAN_VIEN_BAN_HANG" ${
              Nhom == "NHAN_VIEN_BAN_HANG" ? "selected" : ""
            } >NHÂN VIÊN BÁN HÀNG</option>
            <option value="QUAN_LY_NHAP_HANG" ${
              Nhom == "QUAN_LY_NHAP_HANG" ? "selected" : ""
            } >QUẢN LÝ NHẬP HÀNG</option>
            <option value="QUAN_LY_BAN_HANG" ${
              Nhom == "QUAN_LY_BAN_HANG" ? "selected" : ""
            } >QUẢN LÝ BÁN HÀNG</option>
            <option value="QUAN_LY_CUA_HANG" ${
              Nhom == "QUAN_LY_CUA_HANG" ? "selected" : ""
            } >QUẢN LÝ CỬA HÀNG</option>
            <option value="NHAN_VIEN_QUAN_LY" ${
              Nhom == "NHAN_VIEN_QUAN_LY" ? "selected" : ""
            } >NHÂN VIÊN QUẢN LÝ</option>
        </select>
    </div>
    <div class="form-group">
        <label for="Th_File">Chọn hình</label>
        <input type="file" class="form-control-file" id="Th_File" onchange="previewImg()">`;
  if (!item) {
    html += `<img id="Th_PreImg" style="width:10rem"  />`;
  } else {
    html += `<img id="Th_PreImg" style="width:10rem" src="${urlImg}"  />`;
  }

  html += `</div>`;

  document.querySelector("#ModalBody").innerHTML = html;
};

// Preview Image
const previewImg = () => {
  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
    Th_PreImg.src = e.target.result;
  };
  reader.readAsDataURL(document.querySelector("#Th_File").files[0]);
};
// Get key end, create key new
const autoKey = () => {
  let arrNhom = dsUser.filter((x) => x.Ma_so.startsWith("NV_"));
  arrNhom.sort((a, b) => {
    return Number(a.Ma_so.split("_")[1]) - Number(b.Ma_so.split("_")[1]);
  });
  let num = 1;
  if (arrNhom.length > 0) {
    let keyEnd = arrNhom[arrNhom.length - 1];
    num = Number(keyEnd.Ma_so.split("_")[1]) + 1;
  }
  let keyNhom = `NV_${num}`;
  return keyNhom;
};

// Save
const saveUser = () => {
  let Ma_so =
    document.querySelector("#Th_Ma_so").value != ""
      ? document.querySelector("#Th_Ma_so").value
      : autoKey();
  // console.log(Ma_so);
  // return false;

  let Ten = document.querySelector("#Th_Ten").value.trim();
  let Username = document.querySelector("#Th_Username").value;
  let Pwd = document.querySelector("#Th_Pwd").value;
  let Nhom_User = document.querySelector("#Th_Nhom_User").value;
  let Nhom_Ten;
  switch (Nhom_User) {
    case "NHAN_VIEN_NHAP_HANG":
      Nhom_Ten = "Nhân viên Nhập hàng";
      break;
    case "NHAN_VIEN_BAN_HANG":
      Nhom_Ten = "Nhân viên Bán hàng";
      break;
    case "QUAN_LY_NHAP_HANG":
      Nhom_Ten = "Quản lý Nhập hàng";
      break;
    case "QUAN_LY_BAN_HANG":
      Nhom_Ten = "Quản lý Bán hàng";
      break;
    case "QUAN_LY_CUA_HANG":
      Nhom_Ten = "Quản lý Cửa hàng";
      break;
    case "NHAN_VIEN_QUAN_LY":
      Nhom_Ten = "Nhân viên Quản lý";
      break;
    default:
      Nhom_Ten = "khác";
  }

  if (capNhat) {
    // Insert
    let userNew = {
      Ho_ten: Ten,
      Ma_so: Ma_so,
      Ten_Dang_nhap: Username,
      Mat_khau: Pwd,
      Nhom_Nguoi_dung: {
        Ten: Nhom_Ten,
        Ma_so: Nhom_User,
      },
    };

    // console.log(mobileNew)
    // return false;
    // Call API
    apiUserInsert(userNew).then((result) => {
      console.log(result);
      saveImg(Ma_so);
      apiUser().then((result) => {
        dsUser = result;
        Xuat_Danh_sach(dsUser);
        document.querySelector("#ModalCancel").click();
      });
    });
  } else {
    // Update
    let userUpdate = {
      condition: {
        Ma_so: Ma_so,
      },
      update: {
        $set: {
          Ho_ten: Ten,
          Ten_Dang_nhap: Username,
          Mat_khau: Pwd,
          Nhom_Nguoi_dung: {
            Ten: Nhom_Ten,
            Ma_so: Nhom_User,
          },
        },
      },
    };
    // console.log(mobileUpdate)
    // Call API
    apiUserUpdate(userUpdate).then((result) => {
      //console.log(result);
      saveImg(Ma_so);
      apiUser().then((result) => {
        dsUser = result;
        Xuat_Danh_sach(dsUser);
        document.querySelector("#ModalCancel").click();
      });
      //window.location.reload();
    });
  }
};

const saveImg = (Ma_so) => {
  let imgName = document.querySelector("#Th_File").value;
  // Người dùng có chọn hình
  if (imgName) {
    let reader = new FileReader();
    let Chuoi_nhi_phan = "";
    //let Ten_Hinh = `${Ma_so}.png` // upload vào thư mục images trong dịch vụ nodejs
    let Ten_Hinh = `${Ma_so}`; // upload lên trên host cloudinary
    reader.onload = function (e) {
      Chuoi_nhi_phan = e.target.result;
      let img = { name: Ten_Hinh, src: Chuoi_nhi_phan };
      //console.log(img)
      apiImageUser(img).then((result) => {
        //console.log(result)
        //reader.clear()
      });
    };
    reader.readAsDataURL(document.querySelector("#Th_File").files[0]);
  }
};
// const taoHangSXTivi = () => {
//   dsHangSXTivi = Array.from(new Set(dsTivi.map((x) => x.Nhom.Ma_so))).map(
//     (Ma_so) => {
//       nhom = {
//         Ma_so: Ma_so,
//         Ten: dsTivi.find((x) => x.Nhom.Ma_so == Ma_so).Nhom.Ho_ten.toUpperCase(),
//       };
//       return nhom;
//     }
//   );
// };

// const taoBaocaoTivi = () => {
//   Highcharts.setOptions({
//     lang: {
//       numericSymbols: [` Ngàn`, ` Triệu`],
//       numericSymbolMagnitude: 1000,
//       decimalPoint: ",", ///phân cách thập phân
//       thousandsSep: ".", ///hàng ngàn
//     },
//     chart: {
//       style: {
//         fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
//         fontSize: 16,
//       },
//     },
//   });

//   Highcharts.chart("Th_Bieu_do_Tivi", {
//     chart: {
//       type: "column", // column, bar, line
//     },
//     title: {
//       text: cuaHang.Ho_ten,
//     },
//     subtitle: {
//       text: " Thống kê Tivi theo Nhà Sản xuất",
//     },
//     xAxis: {
//       categories: chuDeTivi,
//     },
//     yAxis: {
//       title: {
//         text: "Số Sản phẩm",
//       },
//     },
//     plotOptions: {
//       series: {
//         dataLabels: {
//           enabled: true,
//           y: 30,
//           align: "center",
//           color: "white",
//         },
//       },
//       column: {
//         colorByPoint: true,
//       },
//     },
//     caption: {
//       text: `Thống kê Số lượng Nhập hàng Tivi Theo Nhà Sản xuất `,
//     },

//     series: dataTivi,
//   });
// };
