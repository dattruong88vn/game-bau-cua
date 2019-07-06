import React, { Component } from 'react';
import XucXac from './XucXac';
import DanhSachCuoc from './DanhSachCuoc';

export default class BaiTapGameBauCua extends Component {
    render() {
        return (
            <div className='container w-75'>
                <h3 className="mb-3">Bầu Cua Game</h3>
                <XucXac />
                <DanhSachCuoc />
            </div>
        )
    }
}
