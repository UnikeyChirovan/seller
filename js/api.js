// const Dia_chi_Dich_vu = "http://1/27.0.0.1:8080";
const Dia_chi_Dich_vu = "https://hephucvu-71af3553bec0.herokuapp.com";
// const Dia_chi_Img = "http://127.0.0.1:8080";
const Dia_chi_Img = `https://res.cloudinary.com/dhklbfocj/image/upload/v1/images`;

const apiDangnhap = (nguoidung) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `LOGIN`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    Xu_ly_HTTP.send(JSON.stringify(nguoidung));
  });
};

const apiDienthoai = () => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `listMOBILE`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send();
  });
};
const apiTivi = () => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `listTIVI`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send();
  });
};
//
const apiFood = () => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `listFOOD`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send();
  });
};
//
const apiUser = () => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `listUSER`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send();
  });
};

const apiImageDienthoai = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `imgMOBILE`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//

//
const apiDienthoaiInsert = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `INSERT_MOBILE`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    // Thêm Authorization header với Bearer token từ sessionStorage
    Xu_ly_HTTP.setRequestHeader(
      "Authorization",
      `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
    );
    Xu_ly_HTTP.setRequestHeader(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiDienthoaiUpdate = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `UPDATE_MOBILE`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("PUT", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiDienthoaiDelete = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `DELETE_MOBILE`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("DELETE", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//==================//
const apiImageTivi = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `imgTIVI`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//

//
const apiTiviInsert = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `INSERT_TIVI`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
const apiTiviUpdate = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `UPDATE_TIVI`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("PUT", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiTiviDelete = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `DELETE_TIVI`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("DELETE", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//==================//
const apiImageFood = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `imgFOOD`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//

//
const apiFoodInsert = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `INSERT_FOOD`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
const apiFoodUpdate = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `UPDATE_FOOD`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("PUT", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiFoodDelete = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `DELETE_FOOD`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("DELETE", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

//==================//
const apiImageUser = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `imgUSER`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};
//

//
const apiUserInsert = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `INSERT_USER`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
    // Thêm Authorization header với Bearer token từ sessionStorage
    Xu_ly_HTTP.setRequestHeader(
      "Authorization",
      `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
    );
    Xu_ly_HTTP.setRequestHeader(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiUserUpdate = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `UPDATE_USER`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("PUT", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const apiUserDelete = (item) => {
  return new Promise((Ket_qua, Loi) => {
    let Du_lieu = {};
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.onload = () => {
      var Chuoi_JSON = Xu_ly_HTTP.responseText;
      Du_lieu = JSON.parse(Chuoi_JSON);
      Ket_qua(Du_lieu);
    };
    let Tham_so = `DELETE_USER`;
    let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`;
    Xu_ly_HTTP.open("DELETE", Dia_chi_Xu_ly);
    Xu_ly_HTTP.send(JSON.stringify(item));
  });
};

const randomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};
