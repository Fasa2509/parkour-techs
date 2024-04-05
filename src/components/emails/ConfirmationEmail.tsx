import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import { Container } from "@react-email/container";
import { Section } from "@react-email/section";
import { DOMAIN_NAME } from "@/lib/api/Api";

export const ConfirmationEmail = ({ companyName, token }: { companyName: string; token: string; }) => {
    return (
        <Html lang="es">
            <Container>
                <Text style={{ fontSize: '28px', color: '#777', fontWeight: 'bold', textAlign: 'center' }}>Parkour Techs</Text>
                <Text>¡Hola {companyName} y bienvenidos a Parkour Techs!</Text>
                <Text>Hemos recibido una solicitud para crear una cuenta en nuestra plataforma de administración, si no fuiste tú, ignora este mensaje.</Text>
                <Section style={{ backgroundColor: '#ccdddd', borderRadius: '12px' }}>
                    <Text style={{ paddingLeft: '12px' }}>Para activar tu cuenta, pulsa <Link href={DOMAIN_NAME + '/confirm/' + token}>aquí</Link>.</Text>
                </Section>
            </Container>
        </Html>
    )
};
