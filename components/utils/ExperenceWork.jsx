import React, { useMemo } from 'react';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, TimelineSeparator } from '@mui/lab';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';
import { experience } from '@/utils/profile';

const fmt = (d) => dayjs(d).format('MMM YYYY');

const ExperenceWork = () => {
    // Más reciente primero
    const items = useMemo(
        () => [...experience].sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf()),
        []
    );
    return (
        <Box id="experience" sx={{ mt: 14, scrollMarginTop: 100 }} className="reveal">
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>Trayectoria</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 3 }}>Experiencia laboral</Typography>
            <Timeline sx={{ p: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}>
                {items.map((e, i) => (
                    <TimelineItem key={e.company}>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            {i < items.length - 1 && <TimelineConnector sx={{ bgcolor: 'divider' }} />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ pb: 4 }}>
                            <Box className="glass card-hover" sx={{ p: 3, borderRadius: 4 }}>
                                <Typography variant="h6">{e.company}</Typography>
                                <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                                    {fmt(e.start)} — {e.end ? fmt(e.end) : 'Actualidad'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                                    {e.text}
                                </Typography>
                            </Box>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
};

export default ExperenceWork;
