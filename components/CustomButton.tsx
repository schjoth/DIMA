import { StyleSheet, Pressable, PressableProps, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "play";
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  title,
  ...options
}) => {
  return (
    <Pressable {...options} style={[styles.common, styles[variant]]}>
      <Text style={variant === "play" ? styles.largeText : styles.text}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  common: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: "100%",
    minWidth: 100,
    maxWidth: 200,
  },
  text: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
  largeText: {
    fontWeight: "600",
    fontSize: 40,
    textTransform: "uppercase",
  },
  primary: {
    backgroundColor: "#1DB954",
  },
  secondary: {
    backgroundColor: "#D9D9D9",
  },
  play: {
    backgroundColor: "#1DB954",
  },
});

export default CustomButton;
