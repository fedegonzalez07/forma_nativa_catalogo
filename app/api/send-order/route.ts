import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { customerInfo, cart, total } = await request.json()

    // Crear el contenido del email
    const orderDetails = cart
      .map((item: any) => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`)
      .join("\n")

    const emailContent = `
NUEVO PEDIDO - FORMA NATIVA

INFORMACIÓN DEL CLIENTE:
Nombre: ${customerInfo.name}
Email: ${customerInfo.email}
Teléfono: ${customerInfo.phone}
Dirección: ${customerInfo.address || "No especificada"}

PRODUCTOS PEDIDOS:
${orderDetails}

TOTAL: $${total.toLocaleString()}

NOTAS ADICIONALES:
${customerInfo.notes || "Ninguna"}

---
Este pedido fue generado automáticamente desde la página web de Forma Nativa.
    `

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: "Forma Nativa <pedidos@tudominio.com>", // Cambia por tu dominio
      to: ["tu-email@gmail.com"], // 👈 AQUÍ PON TU EMAIL
      subject: `Nuevo Pedido - ${customerInfo.name}`,
      text: emailContent,
    })

    if (error) {
      console.error("Error enviando email:", error)
      return NextResponse.json({ success: false, message: "Error al enviar el pedido" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Pedido enviado correctamente",
    })
  } catch (error) {
    console.error("Error al procesar el pedido:", error)
    return NextResponse.json({ success: false, message: "Error al procesar el pedido" }, { status: 500 })
  }
}
