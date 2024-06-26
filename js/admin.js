let admin = {};

const xuatAdmin = (src, tag) => {
  let html = `
    <div class="row m-0 text-center">
      <div class="col-3 p-2" onclick="window.location='./mobile/'">
        <div class="btn btn-danger">
          <img
            src="${Dia_chi_Img}/dienthoai.png"
            alt=""
            class="img-fluid img-thumbnail"
          />
          <h5 class="text-white">Mobile</h5>
        </div>
      </div>
      <div class="col-3 p-2">
        <div class="btn btn-warning" onclick="window.location='./tivi/'">
          <img src="${Dia_chi_Img}/tivi.png" alt="" class="img-fluid img-thumbnail" />
          <h5 class="text-white">Tivi</h5>
        </div>
      </div>
      <div class="col-3 p-2" onclick="window.location='./food/'">
        <div class="btn btn-primary">
          <img src="${Dia_chi_Img}/doan.png" alt="" class="img-fluid img-thumbnail" />
          <h5 class="text-white">Food</h5>
        </div>
      </div>
      <div class="col-3 p-2" onclick="window.location='./user/'">
        <div class="btn btn-success">
          <img src="${Dia_chi_Img}/Logo.png" alt="" class="img-fluid img-thumbnail" />
          <h5 class="text-white">User</h5>
        </div>
      </div>
    </div>
  `;
  tag.innerHTML = html;
};

xuatAdmin(admin, tagAdmin);
