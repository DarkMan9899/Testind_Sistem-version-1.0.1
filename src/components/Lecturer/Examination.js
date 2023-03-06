import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { style as ListStyle, columns as ListColumns } from './ListDataTableStyle';

export default (list) => {
    return <>
        <div className="menu2">
            <input type='text' value={this.state.group} className='input' onChange={e => this.setState({ group: e.target.value })} />
            {/* <input type='button' className='btn' value='Find' onClick={e => GetList()} /> */}
            <input type='button' className='btn' value='Start' />
        </div>
        <DataTable
            responsive={true}
            columns={ListColumns}
            data={list}
            customStyles={ListStyle}
            noHeader={true}
            fixedHeader={true}
            className='ListViewDatatable'
        />
    </>
}
