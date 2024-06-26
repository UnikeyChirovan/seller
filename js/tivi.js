var capNhat = true;

let dsHangSXTivi = [];
let chuDeTivi = [];

let dataTivi = [
  {
    name: "Số lượng",
    data: [],
    color: randomColor(),
  },
];

const Xuat_Danh_sach = (ds) => {
  let html = ``;
  ds.sort((a, b) => a.Ten.localeCompare(b.Ten));
  ds.forEach((item, index) => {
    html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td class="text-center" style="width: 25%;">
                <img src='${Dia_chi_Img}/${item.Ma_so}.png' class="" />
            </td>
            <td>${item.Ten}</td>
            <td>${item.Ky_hieu}</td>
            <td class="text-right" >${Tao_Chuoi_The_hien_So_nguyen_duong(
              item.Don_gia_Nhap
            )}<sup>đ</sup></td>
            <td class="text-right">${Tao_Chuoi_The_hien_So_nguyen_duong(
              item.Don_gia_Ban
            )}<sup>đ</sup></td>
            <td class="text-center">${item.Nhom.Ma_so}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa Tivi' onclick="updateTivi('${
                  item.Ma_so
                }')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteTivi('${
                  item.Ma_so
                }')" title='Xóa Tivi'>
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
    let ds = dsTivi.filter((x) =>
      x.Ten.toLowerCase().includes(gtTim.toLowerCase())
    );
    Xuat_Danh_sach(ds);
  }
};
// Add Mobile
const insertTivi = () => {
  capNhat = true;
  showModal();
};
// Update Mobile
const updateTivi = (key) => {
  capNhat = false;
  let item = dsTivi.find((x) => x.Ma_so == key);
  showModal(item);
};
// Delete Mobile
const deleteTivi = (key) => {
  if (confirm("Hệ thống sẽ Xóa Dữ liệu...?")) {
    let condition = {
      Ma_so: key,
    };
    apiTiviDelete(condition).then((result) => {
      alert("Xóa thành công");
      window.location.reload();
    });
  }
};
// Show Modal
const showModal = (item = null) => {
  let urlImg = null;
  let Nhom = "";
  document.querySelector("#ModalTitle").innerHTML = `Thêm Tivi`;
  if (item) {
    document.querySelector("#ModalTitle").innerHTML = `Sửa Tivi`;
    urlImg = `${Dia_chi_Img}/${item.Ma_so}.png`;
    Nhom = item.Nhom.Ma_so;
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
            placeholder="Tên Sản phẩm" value="${item ? item.Ten : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Ky_hieu">Tên</label>
        <input type="text" class="form-control" id="Th_Ky_hieu" 
            placeholder="ký hiệu tivi" value="${item ? item.Ky_hieu : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Don_gia_Nhap">Đơn giá Nhập</label>
        <input type="number" class="form-control" id="Th_Don_gia_Nhap" 
            placeholder="Đơn giá Nhập" value="${item ? item.Don_gia_Nhap : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Don_gia_Ban">Đơn giá Bán</label>
        <input type="number" class="form-control" id="Th_Don_gia_Ban" 
            placeholder="Đơn giá Bán" value="${item ? item.Don_gia_Ban : ""}">
    </div>
    <div class="form-group">
        <label for="Th_Nhom_Tivi">Nhóm Tivi</label>
        <select id="Th_Nhom_Tivi">
            <option value="SONY" ${
              Nhom == "SONY" ? "selected" : ""
            } >SONY</option>
            <option value="SAMSUNG" ${
              Nhom == "SAMSUNG" ? "selected" : ""
            }>SAMSUNG</option>
            <option value="LG" ${Nhom == "LG" ? "selected" : ""}>LG</option>
            <option value="KHAC" ${
              Nhom == "KHAC" ? "selected" : ""
            }>KHÁC</option>
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
  let arrNhom = dsTivi.filter((x) => x.Ma_so.startsWith("TIVI_"));
  arrNhom.sort((a, b) => {
    return Number(a.Ma_so.split("_")[1]) - Number(b.Ma_so.split("_")[1]);
  });
  let num = 1;
  if (arrNhom.length > 0) {
    let keyEnd = arrNhom[arrNhom.length - 1];
    num = Number(keyEnd.Ma_so.split("_")[1]) + 1;
  }
  let keyNhom = `TIVI_${num}`;
  return keyNhom;
};

// Save
const saveTivi = () => {
  let Ma_so =
    document.querySelector("#Th_Ma_so").value != ""
      ? document.querySelector("#Th_Ma_so").value
      : autoKey();
  // console.log(Ma_so);
  // return false;

  let Ten = document.querySelector("#Th_Ten").value.trim();
  let ky_Hieu = document.querySelector("#Th_Ky_hieu").value.trim();
  let Don_gia_Nhap = Number(document.querySelector("#Th_Don_gia_Nhap").value);
  let Don_gia_Ban = Number(document.querySelector("#Th_Don_gia_Ban").value);
  let Nhom_Tivi = document.querySelector("#Th_Nhom_Tivi").value;
  let Nhom_Ten;
  switch (Nhom_Tivi) {
    case "SONY":
    case "SAMSUNG":
      Nhom_Ten = Nhom_Tivi.toLowerCase();
      break;
    case "LG":
      Nhom_Ten = Nhom_Tivi;
      break;
    default:
      Nhom_Ten = "khác";
  }

  if (capNhat) {
    // Insert
    let tiviNew = {
      Ten: Ten,
      Ma_so: Ma_so,
      Ky_hieu: ky_Hieu,
      Don_gia_Ban: Don_gia_Ban,
      Don_gia_Nhap: Don_gia_Nhap,
      Danh_sach_Phieu_Dat: [],
      Danh_sach_Phieu_Ban: [],
      Danh_sach_Phieu_Nhap: [],
      Nhom: {
        Ten: Nhom_Ten,
        Ma_so: Nhom_Tivi,
      },
    };

    // console.log(mobileNew)
    // return false;
    // Call API
    apiTiviInsert(tiviNew).then((result) => {
      console.log(result);
      saveImg(Ma_so);
      apiTivi().then((result) => {
        dsTivi = result;
        Xuat_Danh_sach(dsTivi);
        document.querySelector("#ModalCancel").click();
      });
    });
  } else {
    // Update
    let tiviUpdate = {
      condition: {
        Ma_so: Ma_so,
      },
      update: {
        $set: {
          Ten: Ten,
          Ma_so: Ma_so,
          Ky_hieu: ky_Hieu,
          Don_gia_Ban: Don_gia_Ban,
          Don_gia_Nhap: Don_gia_Nhap,
          Nhom: {
            Ten: Nhom_Ten,
            Ma_so: Nhom_Tivi,
          },
        },
      },
    };
    // console.log(mobileUpdate)
    // Call API
    apiTiviUpdate(tiviUpdate).then((result) => {
      //console.log(result);
      saveImg(Ma_so);
      apiTivi().then((result) => {
        dsTivi = result;
        Xuat_Danh_sach(dsTivi);
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
      apiImageTivi(img).then((result) => {
        //console.log(result)
        //reader.clear()
      });
    };
    reader.readAsDataURL(document.querySelector("#Th_File").files[0]);
  }
};
const taoHangSXTivi = () => {
  dsHangSXTivi = Array.from(new Set(dsTivi.map((x) => x.Nhom.Ma_so))).map(
    (Ma_so) => {
      nhom = {
        Ma_so: Ma_so,
        Ten: dsTivi.find((x) => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase(),
      };
      return nhom;
    }
  );
};

const taoBaocaoTivi = () => {
  Highcharts.setOptions({
    lang: {
      numericSymbols: [` Ngàn`, ` Triệu`],
      numericSymbolMagnitude: 1000,
      decimalPoint: ",", ///phân cách thập phân
      thousandsSep: ".", ///hàng ngàn
    },
    chart: {
      style: {
        fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
        fontSize: 16,
      },
    },
  });

  Highcharts.chart("Th_Bieu_do_Tivi", {
    chart: {
      type: "column", // column, bar, line
    },
    title: {
      text: cuaHang.Ten,
    },
    subtitle: {
      text: " Thống kê Tivi theo Nhà Sản xuất",
    },
    xAxis: {
      categories: chuDeTivi,
    },
    yAxis: {
      title: {
        text: "Số Sản phẩm",
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          y: 30,
          align: "center",
          color: "white",
        },
      },
      column: {
        colorByPoint: true,
      },
    },
    caption: {
      text: `Thống kê Số lượng Nhập hàng Tivi Theo Nhà Sản xuất `,
    },

    series: dataTivi,
  });
};
