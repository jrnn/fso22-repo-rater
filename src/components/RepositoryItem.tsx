import { FC } from "react"
import { Image, StyleSheet, View } from "react-native"
import Text from "./Text"
import { Repository } from "../types"
import { theme } from "../theme"

const styles = StyleSheet.create({
  bottomGutter: {
    paddingBottom: theme.spacing.dense
  },
  headerContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.spacing.regular
  },
  image: {
    borderRadius: theme.rounding.regular,
    height: 48,
    width: 48
  },
  imageContainer: {
    flexGrow: 0,
    padding: theme.spacing.regular
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row"
  },
  itemContainer: {
    backgroundColor: theme.palette.light
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.palette.primary,
    borderRadius: theme.rounding.regular,
    padding: theme.spacing.dense
  },
  statistic: {
    alignItems: "center",
    padding: theme.spacing.regular
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
})

const ItemInfo: FC<Repository> = ({ description, fullName, language, ownerAvatarUrl }) => (
  <View style={styles.infoContainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: ownerAvatarUrl }}
      />
    </View>
    <View style={styles.headerContainer}>
      <Text variant="subheading" weight="bold" style={styles.bottomGutter}>
        {fullName}
      </Text>
      <Text style={styles.bottomGutter}>
        {description}
      </Text>
      <View style={styles.language}>
        <Text color="light" variant="caption">
          {language}
        </Text>
      </View>
    </View>
  </View>
)

const Statistic: FC<{ label: string, figure: number }> = ({ figure, label }) => (
  <View style={styles.statistic}>
    <Text style={styles.bottomGutter} weight="bold">
      {figure >= 1000 ? `${(figure / 1000).toFixed(1)}k` : figure}
    </Text>
    <Text>{label}</Text>
  </View>
)

const ItemStats: FC<Repository> = ({ forksCount, ratingAverage, reviewCount, stargazersCount }) => (
  <View style={styles.statsContainer}>
    <Statistic label="Stars" figure={stargazersCount} />
    <Statistic label="Forks" figure={forksCount} />
    <Statistic label="Reviews" figure={reviewCount} />
    <Statistic label="Rating" figure={ratingAverage} />
  </View>
)

interface Props {
  repository: Repository
}

const RepositoryItem: FC<Props> = ({ repository }) => {
  return (
    <View style={styles.itemContainer}>
      <ItemInfo { ...repository } />
      <ItemStats { ...repository } />
    </View>
  )
}

export default RepositoryItem
