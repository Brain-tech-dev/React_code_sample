import React, { useEffect } from 'react'
import Header from '../../../Layout/header'
import { useState } from 'react'
import TableTitle from '../../Form/TableTitle'
import DynamicTable from '../../Form/DynamicTable'
import Search from '../../Form/Search'
import AddEditButton from '../../Form/AddEditButton'
import { apiUrls } from '../../../utils/apiUrls'
import { callAPI } from '../../../utils/apiUtils'
import { TablePagination } from "@mui/material";
import AddEditTenent from './AddEditTenent'
import { ApiLoder, Delete, ErrorMessage, HasPermission, SuccessMessage } from '../../../helpers/common'
import { useDebounce } from "use-debounce";
import StatusDropdown from '../../../helpers/StatusDropdown'


export default function Index() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("")
  const [object, setObject] = useState("")
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginatedItems, setPaginatedItems] = useState(0);
  const [tenantList, setTenantList] = useState([]);
  const [search, setsearch] = useState('');
  const [loder, setLoader] = useState(false);
  const [delOpen, setDelOpen] = useState(false)
  const [debouncedSearch] = useDebounce(search, 500);
  const [filter, setFilter] = useState({status:"2",tenantId:""});

  const columns = [
     { key: 'logo', label: 'Logo' },
     { key: "companyName", label: "Company Name" },
    { key: 'firstName', label: 'Name' },
      { key: 'email', label: 'Email' },
      {key:'phoneNumber', label: 'Phone Number'},
      {key:'primaryColor', label: 'Site Color'},
    { key: 'code', label: 'Code' },
    { key: 'isActive', label: 'Status' }
  ];



  const handleSearch = (value)=>{
        setsearch(value)
  }

 

  const handleChangePage = (event, newPage) => {
    TenantlistAPI(newPage + 1, rowsPerPage, search,filter.status);
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    let pageNo = 1;
    TenantlistAPI(pageNo, parseInt(event.target.value, 10), search,filter.status);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(pageNo);
  };
  const TenantlistAPI = async (page,perpage,serach,status) => {
    let query={searchValue:serach?serach:"",pageNo:page?page:1,recordPerPage:perpage?perpage:10,tenantId:"",status:status}
      setLoader(true)
     try {
      const apiResponse = await callAPI(apiUrls.Tenantlist,{}, "POST",query);
      setLoader(false)
      if (apiResponse?.data?.isSuccess) {
           setTenantList(apiResponse?.data?.data)
          setPaginatedItems(apiResponse?.data?.totalRecords)
      } else {
        setTenantList([])
      }
     } catch (error) {
      setLoader(false)
      
     }
  }
  useEffect(() => {
    TenantlistAPI(1, rowsPerPage, debouncedSearch,filter.status)
    setPage(1);
     // eslint-disable-next-line
  }, [debouncedSearch])

  const handleclose = () => {
    setOpen(false)
    setObject("")

  }

  const handleapi = () => {
         let pageNo = 1;
        TenantlistAPI(pageNo, rowsPerPage,search,filter.status);
        setPage(pageNo);
        setObject("")
       
  }

  const handleedit = (item) => {
    setAction("edit")
    setObject(item)
    setOpen(true);
   
  }

  const handledelclose = () => {
    setDelOpen(false)

  }


  const handleDelete = async (id) => {
    setLoader(true)
    try{
     const response = await callAPI(apiUrls.TenantDelete,{TenantId:id},'POST',{})
     setLoader(false)
     if(response.data.isSuccess){
      handledelclose();
      SuccessMessage(response.data.message)
      let pageNo = 1;
      TenantlistAPI(pageNo, rowsPerPage,search,filter.status);
      setPage(pageNo);
     }else{
      ErrorMessage(response.data.message)
     }
    }catch(error){
      setLoader(false)
    }
  }

  const handledelete = (item) => {
    setDelOpen(true)
    setObject(item)
  }

  const handlestatus = async (item) => {
    setLoader(true)
    try{
     const response = await callAPI(apiUrls.TenantActiveInActive,{TenantId:item.tenantId},'POST',{})
     setLoader(false)
     if(response.data.isSuccess){
      SuccessMessage(response.data.message)
      TenantlistAPI(page, rowsPerPage,search,filter.status);
     }else{
      ErrorMessage(response.data.message)
     }
    }catch(error){
      setLoader(false)
    }
  }

  const handleChange = (e) => {
    let pageNo = 1;
    TenantlistAPI(pageNo, rowsPerPage,search,e.target.value);
    setPage(1)
    setFilter((val) => {
      return { ...val, [e.target.name]: e.target.value };
    });
  };
  

  return (
    <>
    {loder && <ApiLoder/>}
      <div className="intersight_content">
        <Header title="Tenants" />
        <div className="body_content">
          <div className="awarded-jobs task_table">
            <div className="d-flex align-items-center justify-content-between mb-30">
            <TableTitle title="Manage Tenants"/>
             
              <div className="heading_width_search d-flex align-items-center gap-3">
              
                {HasPermission("TenantAdd") && 
                  <AddEditButton handleClick={(() => {
              setAction("add")
              setOpen(true)
            })
            }   title="Add New Tenant"/>}
              </div>
            </div>


            <div className="d-flex align-items-center gap-2 mb-30">
              
              <div className="filter-dropdown dropdown">
              <Search handleSearch={handleSearch} />
              </div>
              <div className="filter-dropdown dropdown">
              <StatusDropdown value={filter.status} fn={handleChange} />
              </div>
            </div>
            
            <div className="table-responsive">
            <DynamicTable data={tenantList} columns={columns}  title="Tenant" rowActions={['edit', 'delete']} edituser={handleedit} handledelete={handledelete} handlestatus={handlestatus}
            deletepermission="TenantDelete" editpermission="TenantEdit"/>
            {tenantList && tenantList?.length > 0 &&
            <div className="d-flex align-items-center justify-content-end bottom_nav">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 100]}
              component="div"
              count={paginatedItems}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </ul>
        </nav>
      </div>
}
            </div>
          </div>
        </div>
      </div>
      <AddEditTenent open={open} handleclose={handleclose} action={action} LanguageListAPI={handleapi} object={object}/>
      <Delete open={delOpen} handleClose={handledelclose} title={object.firstName + ' ' + object.lastName} id={object?.tenantId} handleDelete={handleDelete} loder={loder}/>
    </>
  )
}
