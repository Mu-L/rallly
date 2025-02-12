import type {
  LinkProps,
  SectionProps,
  TextProps,
} from "@react-email/components";
import {
  Button as UnstyledButton,
  Heading as UnstyledHeading,
  Link as UnstyledLink,
  Section as UnstyledSection,
  Text as UnstyledText,
} from "@react-email/components";

import type { EmailContext } from "../types";

export const lightTextColor = "#4B5563";
export const darkTextColor = "#1F2937";
export const borderColor = "#E2E8F0";

export const Text = (
  props: TextProps & { light?: boolean; small?: boolean },
) => {
  const { light, small, ...forwardProps } = props;
  return (
    <UnstyledText
      {...forwardProps}
      style={{
        margin: "16px 0",
        fontFamily,
        fontSize: small ? "14px" : "16px",
        color: light ? lightTextColor : darkTextColor,
        lineHeight: "1.5",
        ...props.style,
      }}
    />
  );
};

export const Domain = ({ ctx }: { ctx: EmailContext }) => {
  const { baseUrl, domain } = ctx;
  return <Link href={baseUrl}>{domain}</Link>;
};

export const Button = (props: React.ComponentProps<typeof UnstyledButton>) => {
  return (
    <UnstyledButton
      {...props}
      className={props.className}
      style={{
        backgroundColor: "#4F46E5",
        borderRadius: "4px",
        padding: "14px",
        fontFamily,
        boxSizing: "border-box",
        display: "block",
        width: "100%",
        maxWidth: "100%",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
      }}
    />
  );
};

export const Link = (props: LinkProps) => {
  return (
    <UnstyledLink
      {...props}
      style={{ color: "#4F46E5", fontFamily, ...props.style }}
    />
  );
};

const fontSize = {
  h1: "20px",
  h2: "18px",
  h3: "16px",
  h4: "16px",
  h5: "14px",
  h6: "12px",
};

export const Heading = (
  props: React.ComponentProps<typeof UnstyledHeading>,
) => {
  const { as = "h1" } = props;

  return (
    <UnstyledHeading
      {...props}
      as={as}
      style={{
        fontSize: fontSize[as],
        ...props.style,
      }}
    />
  );
};

export const SubHeadingText = (props: TextProps) => {
  return (
    <UnstyledText
      {...props}
      style={{
        marginBottom: "16px",
        marginTop: "8px",
        fontSize: 16,
        color: "#374151",
        fontFamily,
        ...props.style,
      }}
    />
  );
};

export const Section = (props: SectionProps) => {
  return (
    <UnstyledSection
      {...props}
      style={{ marginTop: "16px", marginBottom: "16px", ...props.style }}
    />
  );
};

export const SmallText = (props: TextProps) => {
  return (
    <UnstyledText
      {...props}
      style={{
        fontSize: "14px",
        color: "#6B7280",
        ...props.style,
      }}
    />
  );
};

export const Card = (props: SectionProps) => {
  return (
    <Section
      {...props}
      style={{
        borderRadius: "4px",
        backgroundColor: "#F9FAFB",
        paddingRight: "16px",
        paddingLeft: "16px",
        border: "1px solid #E2E8F0",
      }}
    />
  );
};

export const Signature = () => {
  return (
    <Section>
      <UnstyledText
        style={{
          fontSize: 16,
          margin: 0,
          fontWeight: "bold",
          color: darkTextColor,
          fontFamily,
        }}
      >
        Luke Vella
      </UnstyledText>
      <UnstyledText
        style={{ fontSize: 16, margin: 0, color: lightTextColor, fontFamily }}
      >
        Founder
      </UnstyledText>
      <img
        src="https://d39ixtfgglw55o.cloudfront.net/images/luke.jpg"
        alt="Luke Vella"
        style={{ borderRadius: "50%", marginTop: 16 }}
        width={48}
        height={48}
      />
    </Section>
  );
};

export const trackingWide = {
  letterSpacing: 2,
};

export const fontFamily =
  "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif";

export const primaryColor = "#4F46E5";
