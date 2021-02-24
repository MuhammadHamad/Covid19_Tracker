import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function InfoBox({ title, total, cases}) {
    return (
        <div className="infoBox">
            <Card>
                <CardContent>
                    <Typography className="infoBox__title">
                        {title}
                    </Typography>

                    <h2 className="infoBox__cases">{cases} Today</h2>

                    <Typography className="infoBox__total">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;
