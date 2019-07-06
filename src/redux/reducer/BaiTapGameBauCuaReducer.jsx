const stateDefault = {
    tongTien: 10000,
    tienCuoc: 10,
    danhSachCuoc: [
        { ma: 'nai', img: './img/nai.PNG', tienCuoc: 0 },
        { ma: 'bau', img: './img/bau.PNG', tienCuoc: 0 },
        { ma: 'ga', img: './img/ga.PNG', tienCuoc: 0 },
        { ma: 'ca', img: './img/ca.PNG', tienCuoc: 0 },
        { ma: 'cua', img: './img/cua.PNG', tienCuoc: 0 },
        { ma: 'tom', img: './img/tom.PNG', tienCuoc: 0 },
    ],
    xucXac: [
        { ma: 'bau', img: './img/bau.PNG' },
        { ma: 'bau', img: './img/bau.PNG' },
        { ma: 'bau', img: './img/bau.PNG' },
    ],
    giaTriTienCuoc: [
        { id: 10, value: 10, type: 'my-1 tien active' },
        { id: 20, value: 20, type: 'my-1 tien' },
        { id: 50, value: 50, type: 'my-1 tien' },
        { id: 100, value: 100, type: 'my-1 tien' },
        { id: 200, value: 200, type: 'my-1 tien' },
        { id: 500, value: 500, type: 'my-1 tien' },
        { id: 1000, value: 1000, type: 'my-1 tien' }
    ]
}

const BaiTapGameBauCuaReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'DAT_CUOC': {
            //Xử lý đặt cược
            const updateDanhSachCuoc = [...state.danhSachCuoc];
            let updateTongTien = state.tongTien;
            let index = updateDanhSachCuoc.findIndex(item => item.ma === action.ma);
            if (updateTongTien >= state.tienCuoc) {
                if (index !== -1) {
                    updateDanhSachCuoc[index].tienCuoc += state.tienCuoc;
                }
                updateTongTien -= state.tienCuoc;
                state.tongTien = updateTongTien;
                state.danhSachCuoc = updateDanhSachCuoc;
            }
            else {
                alert('Không đủ tiền để đặt cược!')
            }
            return { ...state };

        }
        case 'CHOI_GAME': {
            let mangXucXacNgauNhien = [];
            for (let i = 0; i < 3; i++) {
                let maRandom = Math.floor(Math.random() * 6);
                let newXucXac = {
                    ma: state.danhSachCuoc[maRandom].ma,
                    img: state.danhSachCuoc[maRandom].img
                }
                mangXucXacNgauNhien.push(newXucXac);
            }
            state.xucXac = mangXucXacNgauNhien;

            // Xử lý hoàn tiền
            let danhSachCuocCapNhat = [...state.danhSachCuoc];
            danhSachCuocCapNhat.forEach((itemCuoc, indexCuoc) => {
                //Tìm từng phần tử mảng cược có trong mảng xúc xắc không => có xử lý hoàn tiền
                let iXucXac = mangXucXacNgauNhien.findIndex(itemXX => itemXX.ma === itemCuoc.ma);

                // //Hoàn tiền
                if (iXucXac !== -1) {
                    state.tongTien += danhSachCuocCapNhat[indexCuoc].tienCuoc;
                }
            })

            // Xử lý tăng điểm
            mangXucXacNgauNhien.forEach((itemXucXac, indexXucXac) => {
                let iCuoc = danhSachCuocCapNhat.findIndex(itemCuoc => itemCuoc.ma === itemXucXac.ma);
                if (iCuoc !== -1) {
                    state.tongTien += danhSachCuocCapNhat[iCuoc].tienCuoc;
                }
            })
            //reset mảng cược
            state.danhSachCuoc = [
                { ma: 'nai', img: './img/nai.PNG', tienCuoc: 0 },
                { ma: 'bau', img: './img/bau.PNG', tienCuoc: 0 },
                { ma: 'ga', img: './img/ga.PNG', tienCuoc: 0 },
                { ma: 'ca', img: './img/ca.PNG', tienCuoc: 0 },
                { ma: 'cua', img: './img/cua.PNG', tienCuoc: 0 },
                { ma: 'tom', img: './img/tom.PNG', tienCuoc: 0 },
            ];

            return { ...state };
        }
        case 'CHON_TIEN': {
            const mangGiaTriCuocUpdate = [...state.giaTriTienCuoc];
            console.log(action.tien);
            let index = mangGiaTriCuocUpdate.findIndex(item => item.id === action.tien.id);
            mangGiaTriCuocUpdate.forEach(item => {
                item.type = 'my-1 tien';
            })

            if (index !== -1) {
                mangGiaTriCuocUpdate[index].type = 'my-1 tien active';
            }
            state.tienCuoc = action.tien.value;
            state.giaTriTienCuoc = mangGiaTriCuocUpdate;
            
            return { ...state};
        }
        case 'HUY_CUOC': {
            let tongTienUpdate = state.tongTien;

            state.danhSachCuoc.map(item => {
                tongTienUpdate += item.tienCuoc;
            });

            state.danhSachCuoc = [
                { ma: 'nai', img: './img/nai.PNG', tienCuoc: 0 },
                { ma: 'bau', img: './img/bau.PNG', tienCuoc: 0 },
                { ma: 'ga', img: './img/ga.PNG', tienCuoc: 0 },
                { ma: 'ca', img: './img/ca.PNG', tienCuoc: 0 },
                { ma: 'cua', img: './img/cua.PNG', tienCuoc: 0 },
                { ma: 'tom', img: './img/tom.PNG', tienCuoc: 0 },
            ];
            state.tongTien = tongTienUpdate;
            return {...state};
        }
    }
    return { ...state};
}

export default BaiTapGameBauCuaReducer;