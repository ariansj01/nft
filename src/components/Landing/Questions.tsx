'use client'
import * as React from 'react';
import Image from "next/image";
import badge from "@/assets/images/Badge.svg";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import { useState } from 'react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme } : {theme : import('@mui/material/styles').Theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme } : {theme : import('@mui/material/styles').Theme}) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Questions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const Card = [
    {
      id: 1,
      expanded: 'panel1',
      title: 'Collapsible Group Item #1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse',
      aria_controls: 'panel1d-content',
      ariaId: 'panel1d-header'
    },
    {
      id: 2,
      expanded: 'panel2',
      title: 'Collapsible Group Item #2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse',
      aria_controls: 'panel2d-content',
      ariaId: 'panel2d-header'
    },
    {
      id: 3,
      expanded: 'panel3',
      title: 'Collapsible Group Item #3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse',
      aria_controls: 'panel3d-content',
      ariaId: 'panel3d-header'
    },
  ];

  return (
    <section className="flex justify-center items-center flex-col">
      <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
      <h2 className='text-center mb-[5vh] text-4xl font-bold'>Awnsered <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text'>Your Questions</span></h2>
      <div className="flex justify-center items-center flex-col rounded-2xl w-full max-w-3xl px-4 my-[5vh]">
        {
          Card.map(item => (
            <Accordion 
              key={item.id}
              className='' 
              expanded={expanded === item.expanded} 
              onChange={() => handleChange(item.expanded)}
            >
              <AccordionSummary aria-controls={item.aria_controls} id={item.ariaId}>
                <Typography component="span">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.text}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </section>
  );
}