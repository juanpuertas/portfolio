import React, { useMemo } from 'react'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, timelineOppositeContentClasses, TimelineSeparator } from '@mui/lab';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';

const listExperenceWork = [
    {
        company: 'B y C Computación C.A.',
        dateInit: dayjs('09-07-2023', 'DD-MM-YYYY'),
        text: `Development of a Help Center in BcY Computación, where through a web application dynamic Help Centers can be created depending on the user's needs.\nDevelopment of a Support Center app where users can manage tasks and assistance, aimed especially at the Call Center, allowing for orderly and efficient management of coordination with attendees, allowing the generation of attendee performance reports along with the number of assistance attended, In addition to providing flexibility when creating a user, it shows granting specific permissions to each user depending on the needs of the coordinator.\nDevelopment of a comprehensive Payroll Creation and Management system (SAE Nóminas) tailored for educational institutions. The application allows administrators to generate and track payrolls, manage employee benefits such as CestaTickets, automate payment receipts, and provides a centralized dashboard with real-time status updates for all financial operations.\nDevelopment of an Access Control system (SAE Control de Acceso) to monitor employee attendance and daily activities. The application features a comprehensive dashboard detailing daily statuses (present, finished, absent), personal incidents (lates, off-site, overtimes), and time balances. It includes a worker directory with real-time status tracking, and integrates with QR scanners (mobile and tablet) for streamlined entry management.`,
        dateFinish: dayjs(),
    },
    {
        company: 'Vamos',
        dateInit: dayjs('11-30-2025', 'DD-MM-YYYY'), // TODO: Update the start date if necessary
        text: `Development of the Vamos app and the VamosRestaurantes app. Although they were part of the same company, they were built as two distinct applications.\nVamosRestaurantes focused on comprehensive restaurant management, allowing administrators to control store settings, view detailed sales reporting and analytics, and efficiently manage active and completed orders in real-time.`,
        dateFinish: dayjs(), // TODO: Update the end date if necessary
    },
    {
        company: 'VamosApp - Travel Module',
        dateInit: dayjs('01-01-2026', 'DD-MM-YYYY'),
        text: `Development of a new intercity travel module for the VamosApp application. This feature allows users to book trips between cities, view route details including intermediate stops, driver information, and vehicle amenities. The implementation included seat reservation, dynamic pricing based on pickup and drop-off locations (such as home pickup or terminal), and luggage management.`,
        dateFinish: dayjs('30-01-2026', 'DD-MM-YYYY'),
    },
]
const ExperenceWork = () => {
    const sortedExperiences = useMemo(() => {
        return [...listExperenceWork].sort((a, b) =>
            a.dateFinish.isBefore(b.dateFinish) ? -1 : 1
        );
    }, [])
    return (
        <Box mt={10}>
            <Typography variant="subtitle1" textAlign='center' sx={{ color: '#fff', fontSize: 32 }}>
                Work Experience
            </Typography>
            <Timeline sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
            >
                {sortedExperiences.map((experience, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot />
                            {index < sortedExperiences.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant='subtitle1' color='#fff'>{experience.company}</Typography>
                            <Typography variant='body1' color='#fff'>From: {experience.dateInit.format('MMMM D, YYYY')}</Typography>
                            <Typography variant='body1' color='#fff'>To: {experience.dateFinish.format('DD-MM-YYYY') === dayjs().format('DD-MM-YYYY')
                                ? 'Now'
                                : experience.dateFinish.format('MMMM D, YYYY')}
                            </Typography>
                            <Typography
                                variant='body1'
                                color='#fff'
                                sx={{ whiteSpace: 'pre-wrap' }}
                            >
                                {experience.text}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
}

export default ExperenceWork