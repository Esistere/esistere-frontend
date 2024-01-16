import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ChartsTextStyle, LineChart, axisClasses } from '@mui/x-charts';

function GraficoAndamento(
  dati: {
    id: string;
    amount: number | null;
  }[]
): JSX.Element {
  const theme = useTheme();

  const createData = (
    id: string,
    amount?: number
  ): { id: string; amount: number | null } => {
    return { id, amount: amount ?? null };
  };

  const [data] = useState(
    dati.map(({ id, amount }) => createData(id, amount ?? undefined))
  );

  return (
    <React.Fragment>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default GraficoAndamento;
