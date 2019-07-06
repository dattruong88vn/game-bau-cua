const stateDefault = {
    tongTien: 1000000,
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
        { id: 10, name:'10', value: 10, type: 'my-1 tien active' },
        { id: 20, name:'20', value: 20, type: 'my-1 tien' },
        { id: 50, name:'50', value: 50, type: 'my-1 tien' },
        { id: 100, name:'100', value: 100, type: 'my-1 tien' },
        { id: 200, name:'200', value: 200, type: 'my-1 tien' },
        { id: 500, name:'500', value: 500, type: 'my-1 tien' },
        { id: 1000, name:'1K', value: 1000, type: 'my-1 tien' },
        { id: 2000, name:'2K', value: 2000, type: 'my-1 tien' },
        { id: 5000, name:'5K', value: 5000, type: 'my-1 tien' },
        { id: 10000, name:'10K', value: 10000, type: 'my-1 tien' },
        { id: 20000, name:'20K', value: 20000, type: 'my-1 tien' },
        { id: 50000, name:'50K', value: 50000, type: 'my-1 tien' },
        { id: 100000, name:'100K', value: 100000, type: 'my-1 tien' },

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