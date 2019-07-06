import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DanhSachCuoc.scss';

class DanhSachCuoc extends Component {

    rendermangGiaTriCuoc = () => {
        return this.props.giaTriTienCuoc.map((item, index) => {
            console.log(item.type);
            return (
                <div
                    className={item.type}
                    key={index} style={{ cursor: 'pointer' }}
                    onClick={() => this.props.chonTien(item)}>
                    <span >{item.value}</span>
                </div>
            )
        })
    }

    renderDanhSachCuoc = () => {
        return this.props.danhSachCuoc.map((item, index) => {
            return (
                <div className='col-4 py-2' key={index}>
                    <div className="card text-center">
                        <h4 className="card-title">{item.ma}</h4>
                        <img className="card-img-top" src={item.img} style={{ width: 150, height: 150 }} />
                        <button
                            className="btn btn-primary px-4 mt-2 w-100"
                            onClick={() => this.props.datCuoc(item.ma)}>
                            {item.tienCuoc}
                        </button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='row m-auto'>
                <div className='col-2 d-flex flex-column align-items-center'>
                    {this.rendermangGiaTriCuoc()}
                </div>
                <div className='col-10'>
                    <div className='row'>
                        {this.renderDanhSachCuoc()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        danhSachCuoc: state.BaiTapGameBauCuaReducer.danhSachCuoc,
        giaTriTienCuoc: state.BaiTapGameBauCuaReducer.giaTriTienCuoc
    }
}

const mapToProps = (dispatch) => {
    return {
        datCuoc: (ma) => {
            dispatch({
                type: 'DAT_CUOC',
                ma
            })
        },
        chonTien: (tien) => {
            dispatch({
                type: 'CHON_TIEN',
                tien
            })
        }
    }
}

export default connect(mapStateToProps, mapToProps)(DanhSachCuoc);