import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import { transpose } from 'mathjs'

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import IconButton from '@material-ui/core/IconButton';
// import Settings from '@material-ui/icons/Settings';
import VariablesConfigDialog from './VariablesConfigDialog';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function AddressForm() {
  const [columnNames] = React.useState(['A', 'B', 'C', 'D', 'G'])

  const columnData = columnNames.map((cn, i) => {
    const ng = columnNames.length - i - 1
    const n = 2 ** ng

    // i = 0, len = 3
    // ng = len - i - 1 = 3 - 0 - 1 = 2
    // n = 2 ** ng = 2 ** 2 = 4

    // i = 1, len = 3
    // ng = 3 - 1 - 1 = 1
    // n = 2 ** ng = 2 ** 1 = 2

    let arr = []
    let x = 1
    const numberOfRows = 2 ** columnNames.length
    for (let j = 1; j <= numberOfRows; j++) {

      arr.push(x)
      if (j % n === 0) {
        x = x === 1 ? 0 : 1
      }
    }
    return arr
  })

	return (
		<React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ margin: 0 }}>
          Define variables
        </Typography>
        {/* <IconButton color="primary" aria-label="settings" component="span">
          <Settings />
        </IconButton> */}
        <VariablesConfigDialog />
      </div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TableContainer style={{ position: 'relative !important' }}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow style={{ position: 'sticky !important', top: '0px !important' }}>
                  {columnNames.map((cn) => (
  									<TableCell key={cn} align="center">{cn}</TableCell>
                  ))}
								</TableRow>
							</TableHead>
							<TableBody>
                {transpose(columnData).map((row, i) => (
									<TableRow key={`row-${i}`}>
                    {row.map((v, j) => (
  										<TableCell key={`cell-${i}-${j}`} align="center">{v}</TableCell>
                    ))}
                  </TableRow>
                ))}
                {/* {JSON.stringify()} */}
                {/* {Array(2**columnNames.length).fill(1).map((v, i) => (
                  <TableRow key={`row-${i}`}>
                  </TableRow>
                ))} */}
								{/* {rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								))} */}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				{/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
			</Grid>
		</React.Fragment>
	);
}
