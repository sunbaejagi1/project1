
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

/* IMAGES */

const IMAGES = {
  myProfile: require("../../assets/images/my-profile.jpg"),
  sunbaejagi: require("../../assets/images/sunbaejagi.jpg"),
  drThompson: require("../../assets/images/dr-thompson.jpg"),
  wembanyama: require("../../assets/images/wembanyama.webp"),
};

/* THEME */

const C = {
  bg: "#101010",
  card: "#181818",
  border: "#2a2a2a",
  text: "#f3f5f7",
  muted: "#777777",
  blue: "#0a93f5",
  pink: "#ff2d6f",
  btn: "#2b2b2b",
};

/* AVATAR */

type AvatarProps = {
  image: any;
  size?: number;
  showPlus?: boolean;
};

const Avatar = ({
  image,
  size = 46,
  showPlus = false,
}: AvatarProps) => (
  <View style={{ width: size, height: size }}>
    <Image
      source={image}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />

    {showPlus && (
      <View style={styles.plusBadge}>
        <Ionicons name="add" size={14} color="#000" />
      </View>
    )}
  </View>
);

/* ACTION */

type ActionProps = {
  icon: React.ReactNode;
  count: string;
};

const Action = ({ icon, count }: ActionProps) => (
  <TouchableOpacity style={styles.action} activeOpacity={0.6}>
    {icon}
    <Text style={styles.actionText}>{count}</Text>
  </TouchableOpacity>
);

/* ACTION ROW */

type ActionRowProps = {
  likes: string;
  comments: string;
  reposts: string;
  shares: string;
};

const ActionRow = ({
  likes,
  comments,
  reposts,
  shares,
}: ActionRowProps) => (
  <View style={styles.actionRow}>
    <Action
      icon={<Ionicons name="heart-outline" size={24} color={C.text} />}
      count={likes}
    />

    <Action
      icon={<Ionicons name="chatbubble-outline" size={22} color={C.text} />}
      count={comments}
    />

    <Action
      icon={<Feather name="repeat" size={22} color={C.text} />}
      count={reposts}
    />

    <Action
      icon={<Feather name="send" size={22} color={C.text} />}
      count={shares}
    />
  </View>
);

/* POST HEADER */

type PostHeaderProps = {
  name: string;
  time: string;
  verified?: boolean;
  community?: string;
};

const PostHeader = ({
  name,
  time,
  verified,
  community,
}: PostHeaderProps) => (
  <View style={styles.postHeader}>
    <Text style={styles.username} numberOfLines={1}>
      {name}
    </Text>

    {verified && (
      <MaterialCommunityIcons
        name="check-decagram"
        size={16}
        color={C.blue}
        style={{ marginLeft: 4 }}
      />
    )}

    {community && (
      <>
        <Ionicons
          name="chevron-forward"
          size={14}
          color={C.muted}
          style={{ marginHorizontal: 5 }}
        />

        <MaterialCommunityIcons
          name="account-group"
          size={14}
          color={C.blue}
        />

        <Text style={styles.community} numberOfLines={1}>
          {community}
        </Text>
      </>
    )}

    <Text style={styles.time}>{time}</Text>

    <View style={{ flex: 1 }} />

    <Feather name="more-horizontal" size={20} color={C.muted} />
  </View>
);

/* PAGINATION BUTTON */

type PageBtnProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  wide?: boolean;
};

const PageBtn = ({
  label,
  active,
  onPress,
  wide,
}: PageBtnProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.pageBtn,
      wide && styles.widePageBtn,
      active && styles.activePageBtn,
    ]}
  >
    <Text style={styles.pageBtnText}>{label}</Text>
  </TouchableOpacity>
);

/* PAGINATION */

const Pagination = () => {
  const [page, setPage] = useState(4);

  return (
    <View style={styles.pageCard}>
      <View style={styles.pageWrap}>
        <PageBtn
          label="Previous"
          wide
          onPress={() => setPage((p) => Math.max(1, p - 1))}
        />

        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <PageBtn
            key={n}
            label={String(n)}
            active={page === n}
            onPress={() => setPage(n)}
          />
        ))}

        <PageBtn
          label="Next"
          wide
          onPress={() => setPage((p) => Math.min(8, p + 1))}
        />

        <PageBtn
          label="Last"
          wide
          onPress={() => setPage(8)}
        />
      </View>
    </View>
  );
};

/* MEDIA CARD */

const MediaCard = () => (
  <View style={styles.media}>
    <Image
      source={IMAGES.wembanyama}
      style={styles.mediaImage}
      resizeMode="cover"
    />

    <View style={styles.lowerThird}>
      <View style={styles.lowerName}>
        <Text style={styles.lowerNameSmall}>VICTOR</Text>
        <Text style={styles.lowerNameBig}>WEMBANYAMA</Text>
      </View>

      <View style={styles.lowerStat}>
        <Text style={styles.lowerStatSmall}>
          SINCE BLK TRACKED (1973-74)
        </Text>

        <Text style={styles.lowerStatBig}>
          2nd player with 50 PTS, 20 REB & 5 BLK in a game
        </Text>

        <Text style={styles.lowerStatSmall}>
          BOB McADOO (1974)
        </Text>
      </View>
    </View>
  </View>
);

/* BOTTOM TAB BAR */

const TabBar = () => (
  <View style={styles.tabBar}>
    <TouchableOpacity>
      <Ionicons name="home" size={30} color={C.text} />
    </TouchableOpacity>

    <TouchableOpacity>
      <Feather name="send" size={26} color={C.muted} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.newBtn}>
      <Ionicons name="add" size={32} color={C.muted} />
    </TouchableOpacity>

    <TouchableOpacity>
      <Ionicons name="heart-outline" size={28} color={C.muted} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.profileBtn}>
      <Image
        source={IMAGES.myProfile}
        style={styles.bottomProfile}
      />
      <View style={styles.redDot} />
    </TouchableOpacity>
  </View>
);

/* MAIN SCREEN */

export default function Index() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <Feather name="menu" size={28} color={C.muted} />

        <MaterialCommunityIcons
          name="at"
          size={38}
          color={C.text}
        />

        <Ionicons name="search" size={28} color={C.muted} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* COMPOSER */}

        <View style={styles.composer}>
          <Avatar image={IMAGES.myProfile} size={48} />

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.username}>raapppyy</Text>
            <Text style={styles.placeholder}>What's new?</Text>
          </View>
        </View>

        {/* POST 1 */}

        <View style={styles.post}>
          <Avatar image={IMAGES.sunbaejagi} showPlus />

          <View style={styles.postBody}>
            <PostHeader
              name="sunbaejagi"
              time="19h"
            />

            <Text style={styles.postText}>
              Bilis ng araw. Novembee 4 na agad! 😌
            </Text>

            <Pagination />

            <ActionRow
              likes="754"
              comments="82"
              reposts="35"
              shares="65"
            />
          </View>
        </View>

        {/* POST 2 */}

        <View style={styles.post}>
          <Avatar image={IMAGES.drThompson} showPlus />

          <View style={styles.postBody}>
            <PostHeader
              name="dr.thompson"
              verified
              community="NBA Threads"
              time="2h"
            />

            <Text style={styles.postText}>
              He looks exhausted down the stretch, but Victor
              Wembanyama has put together a once in a lifetime
              kind of game tonight. 52, 24, and 8.
            </Text>

            <Text style={[styles.postText, { marginTop: 10 }]}>
              FIFTY TWO, TWENTY FOUR, AND EIGHT 😱
            </Text>

            <MediaCard />

            <ActionRow
              likes="464"
              comments="15"
              reposts="20"
              shares="8"
            />
          </View>
        </View>
      </ScrollView>

      <TabBar />
    </SafeAreaView>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  composer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },

  placeholder: {
    color: C.muted,
    fontSize: 17,
    marginTop: 2,
  },

  post: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },

  postBody: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  username: {
    color: C.text,
    fontSize: 17,
    fontWeight: "700",
    flexShrink: 1,
  },

  community: {
    color: C.blue,
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },

  time: {
    color: C.muted,
    fontSize: 14,
    marginLeft: 6,
  },

  postText: {
    color: C.text,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 4,
  },

  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },

  plusBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
  },

  /* PAGINATION */

  pageCard: {
    marginTop: 12,
    backgroundColor: C.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 18,
  },

  pageWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  pageBtn: {
    minWidth: 48,
    height: 54,
    paddingHorizontal: 8,
    marginRight: 7,
    marginBottom: 7,
    backgroundColor: C.btn,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },

  widePageBtn: {
    paddingHorizontal: 14,
  },

  activePageBtn: {
    backgroundColor: C.pink,
  },

  pageBtnText: {
    color: C.text,
    fontSize: 18,
  },

  /* MEDIA */

  media: {
    width: "100%",
    marginTop: 12,
    height: 410,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#2b2b2f",
    justifyContent: "flex-end",
  },

  mediaImage: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
},

  lowerThird: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 12,
    paddingHorizontal: 10,
  },

  lowerName: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  lowerNameSmall: {
    fontSize: 10,
    color: "#222",
    fontWeight: "700",
  },

  lowerNameBig: {
    fontSize: 15,
    color: "#111",
    fontWeight: "900",
  },

  lowerStat: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  lowerStatSmall: {
    fontSize: 8,
    color: "#333",
    fontWeight: "700",
  },

  lowerStatBig: {
    fontSize: 11,
    color: "#111",
    fontWeight: "700",
  },

  /* ACTIONS */

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    color: C.muted,
    fontSize: 15,
    marginLeft: 6,
  },

  /* BOTTOM NAVIGATION */

  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 26 : 12,
    backgroundColor: C.bg,
  },

  newBtn: {
    width: 70,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },

  profileBtn: {
    position: "relative",
  },

  bottomProfile: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  redDot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff3040",
  },
});
