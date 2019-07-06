import React, { Component } from 'react';
import XucXac from './XucXac';
import DanhSachCuoc from './DanhSachCuoc';

export default class BaiTapGameBauCua extends Component {
    render() {
        return (
            <div className='container'>
                <h3 className="mb-3">Bầu Cua Game</h3>
                <div className='my-4'>
                    <XucXac />

                </div>
                <div className='my-4'>
                    <DanhSachCuoc  />
                </div>
            </div>
        )
    }
}
