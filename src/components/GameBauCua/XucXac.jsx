import React, { Component } from 'react';
import { connect } from 'react-redux';

class XucXac extends Component {

    renderXucXac = () => {
        return this.props.xucXac.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item.img} style={{ width: 50 }} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-2 d-flex'>
                        <button 
                            className='btn btn-success'
                            onClick = { () => this.props.choiGame() }
                            style={{fontSize: 20, padding: '5px 20px', marginRight: 10}}>
                            Chơi
                        </button>
                        <button 
                            className='btn btn-danger'
                            onClick = { () => this.props.huyTien() }
                            style={{fontSize: 20, padding: '5px 20px'}}>
                            Hủy
                        </button>
                    </div>
                    <div className='col-8'>
                        <div className='m-auto d-flex justify-content-center'>
                            {this.renderXucXac()}
                        </div>
                    </div>
                    <div className='col-2'>
                        <h5>
                            Tiền: 
                            <span style={{color:'red'}}> {this.props.tongTien}</span> 
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

const getXucXacToProps = (state) => {
    return {
        xucXac: state.BaiTapGameBauCuaReducer.xucXac,
        tongTien: state.BaiTapGameBauCuaReducer.tongTien
    }
}

const mapToProps =(dispatch) => {
    return {
        choiGame: () => {
            dispatch({
                type: 'CHOI_GAME'
            })
        },
        huyTien: () => {
            dispatch({
                type:'HUY_CUOC',
            })
        }
    }
}
export default connect(getXucXacToProps, mapToProps)(XucXac);