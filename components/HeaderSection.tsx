import { Box, Container, Typography } from "@mui/material";
import Avatar from "avataaars";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface IntroContent {
  headline: string,
  subHeadline: string,
  introText: any,
}

export default function HeaderSection(props: IntroContent) {
  return (
    <Container>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "90vh",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "25px",
        }}>
          <Typography variant="h1" sx={{fontWeight: "400"}}>{props.headline}</Typography>
          <Typography variant="h3">{props.subHeadline}</Typography>
          {documentToReactComponents(
            props.introText,
            {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (_node, children) => <Typography variant="h6">{children}</Typography>
              }
            }
          )}
        </Box>
        <Box sx={{
          display: {
            xs: "none",
            md: "flex",
          }
        }}>
          <Avatar
            avatarStyle='Circle'
            topType='ShortHairShortFlat'
            accessoriesType='Prescription02'
            hairColor='BrownDark'
            facialHairType='BeardLight'
            facialHairColor='BrownDark'
            clotheType='Hoodie'
            clotheColor='Blue03'
            eyeType='Happy'
            eyebrowType='Default'
            mouthType='Smile'
            skinColor='Light'
            style={{width: '400px', height: '400px'}}
          />
        </Box>
      </Box>
    </Container>
  )
}
