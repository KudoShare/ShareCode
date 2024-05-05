let banCo = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let nguoiChoiHienTai = "X";
let ketThucTroChoi = false;

function datDauCham(hang, cot) {
    if (!ketThucTroChoi && banCo[hang][cot] === "") {
        banCo[hang][cot] = nguoiChoiHienTai;
        let oanTuTai = document.getElementById(`oan-tu-tai-${hang}-${cot}`);
        oanTuTai.innerText = nguoiChoiHienTai;
        if (kiemTraNguoiChienThang(nguoiChoiHienTai)) {
            hienThongBao(`Người chơi ${nguoiChoiHienTai} thắng!`);
            ketThucTroChoi = true;
            setTimeout(function() {
                window.location.href = "manhinhmoi.html"; // Thay đổi đường dẫn thành màn hình mới bạn muốn chuyển đến
            }, 2000); // Chờ 2 giây trước khi chuyển màn hình
        } else if (laBanCoDayDu()) {
            hienThongBao("Đã hòa!");
            ketThucTroChoi = true;
            setTimeout(function() {
                window.location.href = "manhinhmoi.html"; // Thay đổi đường dẫn thành màn hình mới bạn muốn chuyển đến
            }, 2000); // Chờ 2 giây trước khi chuyển màn hình
        } else {
            nguoiChoiHienTai = nguoiChoiHienTai === "X" ? "O" : "X";
        }
    }
}

function kiemTraNguoiChienThang(nguoiChoi) {
    // Kiểm tra hàng
    for (let i = 0; i < 3; i++) {
        if (banCo[i][0] === nguoiChoi && banCo[i][1] === nguoiChoi && banCo[i][2] === nguoiChoi) {
            return true;
        }
    }
    // Kiểm tra cột
    for (let j = 0; j < 3; j++) {
        if (banCo[0][j] === nguoiChoi && banCo[1][j] === nguoiChoi && banCo[2][j] === nguoiChoi) {
            return true;
        }
    }
    // Kiểm tra đường chéo
    if ((banCo[0][0] === nguoiChoi && banCo[1][1] === nguoiChoi && banCo[2][2] === nguoiChoi) ||
        (banCo[0][2] === nguoiChoi && banCo[1][1] === nguoiChoi && banCo[2][0] === nguoiChoi)) {
        return true;
    }
    return false;
}

function laBanCoDayDu() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (banCo[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

function hienThongBao(noiDung) {
    let thongBao = document.getElementById("thong-bao");
    thongBao.innerText = noiDung;
    thongBao.style.display = "block";
}
// code by kudoo