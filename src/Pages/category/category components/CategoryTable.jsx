import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as categoriesAPI from "../../../API/category";
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import style from "../categoryStyles";
import CategoriesForm from './CategoriesForm';

function createData(category_logo_path, category_name, cid, created_date, updated_date, is_active) {
  return { category_logo_path, category_name, cid, created_date, updated_date, is_active };
}

const CategoryTable = (categories) => {
  const classes = style();
  const [category_name, handleChangecategory_name, setCategory_name] = useInputState('')
  const [categoryID, setCategoryID] = useState('')
  const [addOpen, setaddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [file, setImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let rows = [];

  categories.categories.forEach((element) => {
    rows.push(createData(
      element.category_logo_path,
      element.category_name,
      element.cid,
      element.updated_date,
      element.created_date,
      element.is_active
    ))
  })

  const handleCloseUpdate = () => {
    setaddOpen(false);
  }

  const handleClickOpenDelete = (row) => {
    setCategory_name(row.category_name);
    setCategoryID(row.cid);
    setDeleteOpen(true);
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }

  const handleClickOpenUpdate = (row) => {
    setCategory_name(row.category_name);
    setCategoryID(row.cid);
    setaddOpen(true);
  }

  const updateCatgoriesForm = () => {
    if (file === "") {
      enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
    }
    else {
      categoriesAPI.updateCategories(categoryID, category_name, file).then(res => {
        if (res.status !== 200) {
          enqueueSnackbar(`Failed to update category`, { variant: 'error' });
        }
        else {
          window.location.reload();
        }
      })
    }
  }

  const deleteForm = () => {
    categoriesAPI.deleteCategories(categoryID).then(res => {
      if (res.status !== 200) {
        enqueueSnackbar(`Failed to update category`, { variant: 'error' });
      }
      else {
        window.location.reload();
      }
    })
  }

  return (
    <React.Fragment>
      <CategoriesForm
        category_name={category_name}
        handleChangecategory_name={handleChangecategory_name}
        handleCloseAdd={handleCloseUpdate}
        addOpen={addOpen}
        formType="Add"
        setImage={setImage}
        handleClickAction={updateCatgoriesForm}
      />

      <ConfrimDeleteDialogue
          deleteOpen={deleteOpen}
          handleCloseDelete={handleCloseDelete}
          name={category_name}
          deleteForm={deleteForm}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell align="right">Calories Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Updated Date</TableCell>
              <TableCell align="right">isActive</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.category_logo_path} alt="category logo" className={classes.categoryImg} />
                </TableCell>
                <TableCell align="right">{row.category_name} </TableCell>
                <TableCell align="right">{row.cid}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
                <TableCell align="right">{row.updated_date}</TableCell>
                <TableCell align="right">{row.is_active ? <CheckIcon /> : <CloseIcon />}</TableCell>
                <TableCell align="right"><Button variant="text" onClick={() => handleClickOpenUpdate(row)}><EditIcon /></Button></TableCell>
                <TableCell align="right"><Button variant="text" onClick={() => handleClickOpenDelete(row)}><DeleteForeverIcon /></Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default CategoryTable;

