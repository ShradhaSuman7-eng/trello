import { Card, CardContent, Typography } from "@mui/material";
import { BoardContext } from "../../../context/BoardProvider";

const BoardList = ({ name }) => {
  return (
    <div className="flex justify-center mt-4">
      <Card sx={{ width: 360 }}>
        <CardContent className="flex flex-col items-center gap-4">
          <Typography variant="h6" fontWeight={600}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardList;
